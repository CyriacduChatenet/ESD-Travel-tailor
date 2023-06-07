import { Inject, Injectable, forwardRef } from '@nestjs/common'
import {
  ActivityQuery,
  ActivityTag,
  Travel,
  User,
  Day,
} from '@travel-tailor/types'
import * as moment from 'moment'

import { UserService } from '../../../../user/user.service'
import { TravelService } from '../travel.service'
import { ActivityService } from '../../../../activity/activity.service'
import { DayService } from '../day/day.service'
import { TimeSlotService } from '../day/time-slot/time-slot.service'
import { Activity } from '../../../../activity/entities/activity.entity'
import { UpdatePlanningActivityDto } from './dto/update-planning-activity.dto'
import { UpdateTravelDto } from '../dto/update-travel.dto'

const MAX_TIME_SLOTS_PER_DAY = 5

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

  private getTravelDays(startDate: Date, endDate: Date): Day[] {
    const days: Day[] = []

    let currentDate = moment(startDate.toISOString())
    const lastDate = moment(endDate.toISOString())

    while (currentDate <= lastDate) {
      const day: Day = {
        date: currentDate.toDate(),
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
    const query: ActivityQuery = {
      location: travel.destinationCity,
      limit: 50,
    }
    const activities = await this.activityService.findAll(query)
    return activities.data
  }

  private filterActivitiesByOpenDays(activitiesQuery, days: Day[]) {
    const filteredActivities = activitiesQuery.filter((activity) => {
      const shouldKeepActivity = activity.detail.closingDays.every(
        (closureDay: Day) => {
          return days.every(
            (day) => day.date.getTime() !== closureDay.date.getTime()
          )
        }
      )

      return shouldKeepActivity
    })

    return filteredActivities
  }

  private async filterActivities(
    travel,
    tastes: Partial<ActivityTag[]>,
    availableActivities: Activity[]
  ) {
    const activitiesQuery = await this.filterActivitiesWithQueriesAndTastes(
      travel,
      tastes
    )
    const activitiesFilteredByOpenedDays = this.filterActivitiesByOpenDays(
      activitiesQuery,
      this.getTravelDays(travel.departureDate, travel.returnDate)
    )

    // Filtrer les activités disponibles en excluant celles déjà sélectionnées pour les jours précédents
    const filteredActivities = activitiesFilteredByOpenedDays.filter(
      (activity) => {
        return !availableActivities.some(
          (selectedActivity) => selectedActivity.id === activity.id
        )
      }
    )

    return filteredActivities
  }

  private async createPlanning(travel, activities: Activity[]) {
    const days = this.getTravelDays(travel.departureDate, travel.returnDate)

    for (const day of days) {
      const createDayDto = {
        date: day.date,
        travel,
        dayTimeSlots: [],
      }
      const createdDay = await this.dayService.create(createDayDto)
      const timeSlots = []

      let previousEndTime = null

      for (let i = 0; i < MAX_TIME_SLOTS_PER_DAY; i++) {
        if (activities.length === 0) {
          break // Aucune activité disponible
        }

        const randomIndex = Math.floor(Math.random() * activities.length)
        const activity = activities[randomIndex]
        activities.splice(randomIndex, 1)

        const activityInDB = (await this.activityService.findOne(
          activity.id
        )) as any

        const activityDuration = activity.detail.duration
        const openingTime = moment(
          activity.detail.schedules[0].opening_at,
          'HH:mm:ss'
        )

        let startTime
        let endTime

        if (!previousEndTime) {
          // Premier créneau de la journée
          startTime = openingTime.toDate()
          endTime = openingTime.clone().add(activityDuration, 'hours').toDate()
        } else {
          // Créneaux suivants
          startTime = moment(previousEndTime).toDate()
          endTime = moment(previousEndTime)
            .add(activityDuration, 'hours')
            .toDate()
        }

        const isOverlapping = timeSlots.some((slot) => {
          const startTimeOverlap = moment(startTime).isBetween(
            slot.startTime,
            slot.endTime,
            null,
            '[)'
          )
          const endTimeOverlap = moment(endTime).isBetween(
            slot.startTime,
            slot.endTime,
            null,
            '(]'
          )
          const slotInside =
            moment(startTime).isSameOrBefore(slot.startTime) &&
            moment(endTime).isSameOrAfter(slot.endTime)
          return startTimeOverlap || endTimeOverlap || slotInside
        })

        if (isOverlapping) {
          // Gérer les chevauchements de créneaux ici
          // Par exemple, passer au créneau horaire suivant
          continue
        }

        const createTimeSlotDto = {
          startTime,
          endTime,
          day: createdDay,
          activity: activityInDB,
        }

        const timeSlot = await this.timeSlotService.create(createTimeSlotDto)
        timeSlots.push(timeSlot)

        if (activityInDB.timeSlots) {
          activityInDB.timeSlots.push(timeSlot)
        } else {
          activityInDB.timeSlots = [timeSlot]
        }

        await this.activityService.update(activity.id, activityInDB)

        previousEndTime = endTime
      }

      if (createdDay.timeSlots) {
        createdDay.timeSlots.push(...timeSlots)
        await this.dayService.update(createdDay.id, createdDay)
      }
    }
  }

  async create(userConnected: User, travel) {
    const user = await this.userService.findOneByEmail(userConnected.email)
    const travelInDB = await this.travelService.findOne(travel.id)
    const tastes = user.traveler.tastes

    const availableActivities: Activity[] = []
    const activities = await this.filterActivities(
      travelInDB,
      tastes,
      availableActivities
    )
    await this.createPlanning(travelInDB, activities)
  }

  async updatePlanningActivity(
    travelId: string,
    updatePlanningActivityDto: UpdatePlanningActivityDto
  ) {
    const travel = await this.travelService.findOne(travelId)
    const day = await this.dayService.findOne(updatePlanningActivityDto.day_id)
    const timeSlot = await this.timeSlotService.findOne(
      updatePlanningActivityDto.time_slot_id
    )
    const newActivity = await this.activityService.findOne(
      updatePlanningActivityDto.new_activity_id
    )

    if (!travel || !day || !timeSlot || !newActivity) {
      throw new Error('Invalid travel, day, time slot, or new activity')
    }

    const existingActivity = timeSlot.activity
    const activities = await this.filterActivities(
      travel,
      [],
      [existingActivity]
    )

    if (!activities.some((activity) => activity.id === newActivity.id)) {
      throw new Error('The new activity is not available for the travel')
    }

    // Remove the time slot from the existing activity
    if (existingActivity && existingActivity.timeSlots) {
      const existingActivityIndex = existingActivity.timeSlots.findIndex(slot => slot.id === timeSlot.id);
      if (existingActivityIndex !== -1) {
        existingActivity.timeSlots.splice(existingActivityIndex, 1);
        await this.activityService.update(existingActivity.id, existingActivity);
      }
    }

    // Assign the new activity to the time slot
    timeSlot.activity = newActivity
    await this.timeSlotService.update(timeSlot.id, timeSlot)

    // Add the time slot to the new activity
    if (newActivity.timeSlots) {
      newActivity.timeSlots.push(timeSlot)
    } else {
      newActivity.timeSlots = [timeSlot]
    }
    await this.activityService.update(newActivity.id, newActivity)
  }

  async updateTravelSpec(user: User, travelId: string, updateTravelDto: UpdateTravelDto) {
    const travel = await this.travelService.findOne(travelId);
    travel.days = [];
    await this.travelService.update(travelId, { days: [] });
    const planning = await this.create(user, travel);

    return await this.travelService.update(travelId, {...updateTravelDto, days: planning});
  }
}
