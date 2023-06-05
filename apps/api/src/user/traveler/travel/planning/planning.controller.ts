import { Controller, Param, Patch } from "@nestjs/common";

import { PlanningService } from "./planning.service";
import { User } from "../../../../config/decorators/user.decorator";

@Controller("planning")
export class PlanningController {
    constructor(private readonly planningService: PlanningService) {}

    @Patch(':travel_id')
    async updatePlanning(@User() user, @Param('travel_id') travel_id: string) {
        return await this.planningService.update(user, travel_id);
    }
}