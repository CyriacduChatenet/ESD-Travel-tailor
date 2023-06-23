import { Body, Controller, Param, Patch, UseGuards } from "@nestjs/common";
import { Throttle, ThrottlerGuard } from "@nestjs/throttler";

import { PlanningService } from "./planning.service";
import { JwtAuthGuard } from "../../../../auth/guards/jwt-auth.guard";
import { Role } from "../../../../config/enum/role.enum";
import { Roles } from "../../../../config/decorators/roles.decorator";
import { UpdatePlanningActivityDto } from "./dto/update-planning-activity.dto";
import { User } from "./../../../../config/decorators/user.decorator";
import { UpdateTravelDto } from "../dto/update-travel.dto";

@Controller("planning")
@UseGuards(ThrottlerGuard)
export class PlanningController {
    constructor(private readonly planningService: PlanningService) {}

    @Throttle(1000, 60)
    @UseGuards(JwtAuthGuard)
    @Roles(Role.Traveler, Role.Admin)
    @Patch('/activity/:travel_id')
    async updatePlanningActivity(@Param('travel_id') travel_id: string, @Body() updatePlanningActivityDto: UpdatePlanningActivityDto) {
        return await this.planningService.updatePlanningActivity(travel_id, updatePlanningActivityDto);
    }

    @Throttle(1000, 60)
    @UseGuards(JwtAuthGuard)
    @Roles(Role.Traveler, Role.Admin)
    @Patch(':travel_id')
    async updateTravelSpec(@User() user, @Param('travel_id') travel_id: string, @Body() updateTravelDto: UpdateTravelDto) {
        return await this.planningService.updateTravelSpec(user, travel_id, updateTravelDto);
    }
}