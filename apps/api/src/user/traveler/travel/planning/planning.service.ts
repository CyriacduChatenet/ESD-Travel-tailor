import { Inject, Injectable, forwardRef } from '@nestjs/common'
import { Activity, ActivityQuery, ActivityTag, User } from '@travel-tailor/types'

import { UserService } from '../../../../user/user.service'
import { TravelService } from '../travel.service'
import { ActivityService } from '../../../../activity/activity.service'

@Injectable()
export class PlanningService {
  constructor(
    private userService: UserService,
    private activityService: ActivityService,
    @Inject(forwardRef(() => TravelService))
    private travelService: TravelService
  ) {}


  private getTravelDays(startDate: Date, endDate: Date): { date: Date; dayOfWeek: string }[] {
    const days = [];
    let currentDate = new Date(startDate);
  
    while (currentDate <= endDate) {
      const dayOfWeek = new Intl.DateTimeFormat('en-US', { weekday: 'long' }).format(currentDate);
      days.push({ date: currentDate, dayOfWeek });
      currentDate = new Date(currentDate);
      currentDate.setDate(currentDate.getDate() + 1);
    }
    return days;
  }


  private setTasteNames(tastes: Partial<ActivityTag[]>, tasteNames: string[]) {
    return tastes.map(taste => tasteNames.push(taste.name))
  }


  private async filterActivitiesWithQueriesAndTastes(travel, tastes: Partial<ActivityTag[]>) {
    const days = this.getTravelDays(travel.departureDate, travel.returnDate);
    console.log(days)
    
    const tasteNames: string[] = []
    this.setTasteNames(tastes, tasteNames)

    const query: ActivityQuery = { location: travel.destinationCity,}
    const activities = await this.activityService.findAll(query)
    return activities.data
  }

  private filterActivitiesByOpenDays(activitiesQuery, days) {
    const filteredActivities = activitiesQuery.filter(activity => {
      // Vérifier si tous les jours de fermeture sont différents de tous les jours dans le tableau days
      const shouldKeepActivity = activity.detail.closingDays.every(closureDay => {
        return days.every(day => day.date.getTime() !== closureDay.date.getTime());
      });

      return shouldKeepActivity;
    });
  
    return filteredActivities;
  }


  private async filterActivities(travel, tastes: Partial<ActivityTag[]>) {
    const activitiesQuery = await this.filterActivitiesWithQueriesAndTastes(travel, tastes)
    const activities = this.filterActivitiesByOpenDays(activitiesQuery, this.getTravelDays(travel.departureDate, travel.returnDate))
    return activities
  }


  async create(userConnected: User, travel) {
    const user = await this.userService.findOneByEmail(userConnected.email)
    const travelInDB = await this.travelService.findOne(travel.id)

    const tastes = user.traveler.tastes

    const activities = await this.filterActivities(travelInDB, tastes)
    console.log('activities', activities)
  }
}
