import { Inject, Injectable, forwardRef } from '@nestjs/common'
import { ActivityQuery, ActivityTag, Taste, User } from '@travel-tailor/types'

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

  private getDaysBetweenDates(startDate: Date, endDate: Date): { date: Date; dayOfWeek: string }[] {
    const days = [];
    let currentDate = new Date(startDate);
  
    while (currentDate <= endDate) {
      const dayOfWeek = new Intl.DateTimeFormat('en-US', { weekday: 'long' }).format(currentDate);
      days.push({ date: currentDate, dayOfWeek });
      currentDate = new Date(currentDate);
      currentDate.setDate(currentDate.getDate() + 1);
    }

    console.log(days)
    return days;
  }

  private async filterActivities(travel, tastes: Partial<ActivityTag[]>) {
    this.getDaysBetweenDates(travel.departureDate, travel.returnDate);
    
    const query: ActivityQuery = { location: travel.destinationCity, tags: JSON.stringify(tastes)}
    return await this.activityService.findAll(query)
  }

  async create(userConnected: User, travel) {
    const user = await this.userService.findOneByEmail(userConnected.email)
    console.log('user', user)

    const travelInDB = await this.travelService.findOne(travel.id)
    console.log('travelInDB', travelInDB)

    const tastes = user.traveler.tastes

    const activities = await this.filterActivities(travelInDB, tastes)
    console.log('activities', activities)
  }
}
