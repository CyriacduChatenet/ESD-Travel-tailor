import { Inject, Injectable, forwardRef } from '@nestjs/common'
import {
  Activity,
  ActivityQuery,
  ActivityTag,
  TimeSlot as TimeSlotType,
  Travel,
  User,
} from '@travel-tailor/types'
import * as moment from 'moment'

import { UserService } from '../../../../user/user.service'
import { TravelService } from '../travel.service'
import { ActivityService } from '../../../../activity/activity.service'
import { DayService } from '../day/day.service'
import { TimeSlotService } from '../day/time-slot/time-slot.service'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'

type DaySubType = {
  id?: string
  date?: Date
  dayOfWeek?: string
  timeSlots?: TimeSlotType[]
}

@Injectable()
export class PlanningService {
  constructor(
    private userService: UserService,
    private activityService: ActivityService,
    private dayService: DayService,
    private timeSlotService: TimeSlotService,
    @Inject(forwardRef(() => TravelService))
    private travelService: TravelService,
  ) {}

  private getTravelDays(startDate: Date, endDate: Date): DaySubType[] {
    const days: DaySubType[] = []

    let currentDate = moment(startDate.toISOString()) // utiliser toISOString()
    const lastDate = moment(endDate.toISOString()) // utiliser toISOString()

    while (currentDate <= lastDate) {
      const day: DaySubType = {
        date: currentDate.toDate(),
        dayOfWeek: currentDate.format('dddd'),
      }
      days.push(day)
      currentDate = currentDate.clone().add(1, 'day')
    }

    return days
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
        dayTimeSlots: [],
      };
      const createdDay = await this.dayService.create(createDayDto);
    
      const createTimeSlotDto = {
        startTime: new Date(),
        endTime: new Date(),
        dayTimeSlots: [],
      }
    
      const timeSlot = await this.timeSlotService.create(createTimeSlotDto);
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
