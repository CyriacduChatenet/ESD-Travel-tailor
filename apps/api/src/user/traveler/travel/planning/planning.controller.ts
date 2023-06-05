import { Body, Controller, Param, Patch, UseGuards } from "@nestjs/common";
import { Throttle, ThrottlerGuard } from "@nestjs/throttler";

import { PlanningService } from "./planning.service";
import { JwtAuthGuard } from "../../../../auth/guards/jwt-auth.guard";
import { Role } from "../../../../config/enum/role.enum";
import { Roles } from "../../../../config/decorators/roles.decorator";
import { UpdatePlanningActivityDto } from "./dto/update-planning-activity.dto";

@Controller("planning")
@UseGuards(ThrottlerGuard)
export class PlanningController {
    constructor(private readonly planningService: PlanningService) {}

    @Throttle(100, 60)
    @UseGuards(JwtAuthGuard)
    @Roles(Role.Traveler, Role.Admin)
    @Patch('/activity/:travel_id')
    async updatePlanningActivity(@Param('travel_id') travel_id: string, @Body() updatePlanningActivityDto: UpdatePlanningActivityDto) {
        return await this.planningService.updatePlanningActivity(travel_id, updatePlanningActivityDto);
    }
}