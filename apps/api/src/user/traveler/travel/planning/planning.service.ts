import { Inject, Injectable, forwardRef } from '@nestjs/common'
import {
  Activity,
  ActivityQuery,
  ActivityTag,
  TimeSlot as timeSlotType,
  Travel,
  User,
} from '@travel-tailor/types'
import * as moment from 'moment'

import { UserService } from '../../../../user/user.service'
import { TravelService } from '../travel.service'
import { ActivityService } from '../../../../activity/activity.service'
import { DayService } from '../day/day.service'
import { TimeSlotService } from '../day/time-slot/time-slot.service'

type DaySubType = { date: Date; dayOfWeek: string }

@Injectable()
export class PlanningService {
  constructor(
    private userService: UserService,
    private activityService: ActivityService,
    private dayService: DayService,
    private timeSlotService: TimeSlotService,
    @Inject(forwardRef(() => TravelService))
    private travelService: TravelService
  ) {}

  private getTravelDays(startDate: Date, endDate: Date): DaySubType[] {
    const days: DaySubType[] = [];
  
    let currentDate = moment(startDate.toISOString()); // utiliser toISOString()
    const lastDate = moment(endDate.toISOString()); // utiliser toISOString()
  
    while (currentDate <= lastDate) {
      const day: DaySubType = {
        date: currentDate.toDate(),
        dayOfWeek: currentDate.format('dddd'),
      };
      days.push(day);
      currentDate = currentDate.clone().add(1, 'day');
    }
  
    return days;
  }
  

  private setTasteNames(tastes: Partial<ActivityTag[]>, tasteNames: string[]) {
    return tastes.map((taste) => tasteNames.push(taste.name))
  }

  private async filterActivitiesWithQueriesAndTastes(
    travel: Partial<Travel>,
    tastes: Partial<ActivityTag[]>
  ) {
    const tasteNames: string[] = []
    this.setTasteNames(tastes, tasteNames)
    const query: ActivityQuery = { location: travel.destinationCity, limit: 50 }
    const activities = await this.activityService.findAll(query)
    return activities.data
  }

  private filterActivitiesByOpenDays(activitiesQuery, days: DaySubType[]) {
    const filteredActivities = activitiesQuery.filter((activity) => {
      // Vérifier si tous les jours de fermeture sont différents de tous les jours dans le tableau days
      const shouldKeepActivity = activity.detail.closingDays.every(
        (closureDay: DaySubType) => {
          return days.every(
            (day) => day.date.getTime() !== closureDay.date.getTime()
          )
        }
      )

      return shouldKeepActivity
    })

    return filteredActivities
  }

  private async filterActivities(travel, tastes: Partial<ActivityTag[]>) {
    const activitiesQuery = await this.filterActivitiesWithQueriesAndTastes(
      travel,
      tastes
    )
    const activitiesFilteredByOpenedDays = this.filterActivitiesByOpenDays(
      activitiesQuery,
      this.getTravelDays(travel.departureDate, travel.returnDate)
    )
    return activitiesFilteredByOpenedDays
  }


  // private async createPlanning(travel, activities: Activity[]) {
  //   const days = this.getTravelDays(travel.departureDate, travel.returnDate);
  
  //   for (const day of days) {
  //     const createDayDto = {
  //       date: day.date,
  //       travel,
  //     };
  //     const createdDay = await this.dayService.create(createDayDto);
  //   }
  // }


  private async createPlanning(travel, activities: Activity[]) {
    const days = this.getTravelDays(travel.departureDate, travel.returnDate);
    
    for (const day of days) {
      const createDayDto = {
        date: day.date,
        travel,
      };
      const createdDay = await this.dayService.create(createDayDto);
  
      // Get start and end times of the day
      const startOfDay = moment(day.date).startOf('day').add(8, 'hours');
      const endOfDay = moment(day.date).startOf('day').add(24, 'hours');
  
      // Sort activities by start time
      const sortedActivities = activities.slice().sort((a, b) =>
        moment(a.detail.schedules[0].opening_at).diff(moment(b.detail.schedules[0].opening_at))
      );
  
      let currentSlotEnd = startOfDay;
      for (const activity of sortedActivities) {
        // Get start and end times of the activity
        const activityStart = moment(activity.detail.schedules[0].opening_at);
        const activityEnd = moment(activity.detail.schedules[0].closing_at);
  
        // If activity ends after the end of the day, skip it
        if (activityEnd.isAfter(endOfDay)) {
          continue;
        }
  
        // If activity starts before the current slot, update the current slot end time
        if (activityStart.isBefore(currentSlotEnd)) {
          currentSlotEnd = activityEnd;
          continue;
        }
  
        // Create time slot for activity
        const slotDuration = moment.duration(activity.detail.duration);
        const slotEnd = moment.min(activityStart.clone().add(slotDuration), activityEnd, endOfDay);
        const slot = await this.timeSlotService.create({
          startTime: activityStart.format('HH:mm'),
          endTime: slotEnd.format('HH:mm'),
          day: createdDay,
          activities: [activity],
        });
  
        // Update current slot end time
        currentSlotEnd = slotEnd;
      }
  
      // Create last time slot for remaining time in the day
      if (currentSlotEnd.isBefore(endOfDay)) {
        const slot = await this.timeSlotService.create({
          startTime: currentSlotEnd.format('HH:mm'),
          endTime: endOfDay.format('HH:mm'),
          day: createdDay,
        });
      }
    }
  }

  
  async create(userConnected: User, travel) {
    const user = await this.userService.findOneByEmail(userConnected.email)
    const travelInDB = await this.travelService.findOne(travel.id)
    const tastes = user.traveler.tastes

    const activities = await this.filterActivities(travelInDB, tastes)
    return await this.createPlanning(travelInDB, activities)
  }
}
