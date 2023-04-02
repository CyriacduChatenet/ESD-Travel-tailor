import { ActivityService } from '../../../activity/activity.service'
import { TravelerService } from '../traveler.service'
import { UserService } from '../../../user/user.service'

export class PlanningService {
  constructor(
    private activityService: ActivityService,
    private travelerService: TravelerService,
    private userService: UserService
  ) {}

  async create () {};
}
