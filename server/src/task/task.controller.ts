import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Put,
  Req,
  UseGuards,
} from '@nestjs/common';
import { TaskService } from './task.service';
import { Task } from './schema/task.schema';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { AuthGuard } from '@nestjs/passport';
import { CompleteTaskDto } from './dto/complete-task.dto';

@Controller('tasks')
export class TaskController {
  constructor(private taskService: TaskService) {}

  @Get()
  @UseGuards(AuthGuard())
  async getAllTasks(@Req() req): Promise<Task[]> {
    const user = req.user;
    return this.taskService.findAll(user);
  }

  @Post()
  @UseGuards(AuthGuard())
  async createTask(
    @Body()
    task: CreateTaskDto,
    @Req() req,
  ): Promise<Task> {
    // console.log(req.user)
    return this.taskService.create(task, req.user);
  }

  // @Get(':id')
  // async getTask(@Param('id') id: string): Promise<Task> {
  //   return this.taskService.findById(id);
  // }
  @Patch(':id')
  @UseGuards(AuthGuard())
  async updateTask(
    @Param('id')
    id: string,

    @Body()
    task: UpdateTaskDto,
  ): Promise<Task> {
    return this.taskService.updateById(id, task);
  }

  @Patch('complete/:id')
  @UseGuards(AuthGuard())
  async completedTask(
    @Param('id') id: string,
    @Body() completeTaskDto: CompleteTaskDto,
    
  ): Promise<Task> {
    return this.taskService.completeTask(id, completeTaskDto.completed);
  }

  @Delete(':id')
  @UseGuards(AuthGuard())
  async deleteTask(@Param('id') id: string): Promise<void> {
    return this.taskService.deleteById(id);
  }
}
