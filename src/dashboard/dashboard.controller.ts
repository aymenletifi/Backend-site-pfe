import { Controller, Get } from '@nestjs/common';
import { DashboardService } from './dashboard.service';
import { User } from './schemas/user.schema';

@Controller("dashboard")
export class DashboardController {
    constructor(private readonly dashboardService: DashboardService) { }

    @Get("users")
    async getUsers(): Promise<User[]> {
        return this.dashboardService.findAll();
    }
}
