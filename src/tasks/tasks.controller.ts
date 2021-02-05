import { Body, Controller, Delete, Get, Param, Patch, Post, Request, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { TaskDto } from 'src/dto/create-task.dto';
import { TasksService } from './tasks.service';

@Controller('tasks')
export class TasksController {
    constructor(private tasksService: TasksService) { }

    //@UseGuards(JwtAuthGuard)
    @Get()
    getTasks(@Request() req) {
        return this.tasksService.findAll();
    }

    //@UseGuards(JwtAuthGuard)
    @Post()
    createTask(@Body() taskDto: TaskDto) {
        return this.tasksService.createTask(taskDto);
    }

    //@UseGuards(JwtAuthGuard)
    @Patch(':id')
    updateTask(@Param('id') id: string, @Body() taskDto: TaskDto) {
        return this.tasksService.updateTask(id, taskDto);
    }

    //@UseGuards(JwtAuthGuard)
    @Delete(':id')
    deleteTask(@Param('id') id: string) {
        return this.tasksService.deleteTask(id);
    }
}
