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

  private async filterActivities(travel, tastes: Partial<ActivityTag[]>) {
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
