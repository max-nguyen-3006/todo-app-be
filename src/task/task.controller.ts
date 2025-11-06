import { Body, Controller, Get, Post } from '@nestjs/common';
import { TaskService } from './task.service';
import { Task } from './entities/task.entity';


@Controller('tasks')
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  @Get('getAllTasks')
  async getAllTasks(): Promise<Task[]> {
    return this.taskService.findAll();
  }
   @Post()
  async createTask(
    @Body('taskName') taskName: string,
  ): Promise<Task> {
    return this.taskService.create(taskName);
  }
}
