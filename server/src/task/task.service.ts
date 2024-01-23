import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Task } from './schema/task.schema';
import * as mongoose from 'mongoose';
import { User } from 'src/auth/schema/user.schema';

@Injectable()
export class TaskService {
  constructor(
    @InjectModel(Task.name)
    private taskModel: mongoose.Model<Task>,
  ) {}

  async findAll(user: User): Promise<Task[]> {
    const tasks = await this.taskModel.find({ user: user._id });
    return tasks;
  }

  async create(task: Task, user: User): Promise<Task> {
    const data = Object.assign(task, { user: user._id });
    const res = await this.taskModel.create(data);
    return res;
  }

  //   async findById(id: string): Promise<Task> {
  //       const isValidId = mongoose.isValidObjectId(id);
  //       if (!isValidId) {
  //           throw new BadRequestException("Please enter correct Id")
  //       }
  //   const task = await this.taskModel.findById(id);

  //   if (!task) {
  //     throw new NotFoundException('Task not Found');
  //   }
  //   return task;
  // }

  async updateById(id: string, task: Task): Promise<Task> {
    const isValidId = mongoose.isValidObjectId(id);
    if (!isValidId) {
      throw new BadRequestException('Please enter correct Id');
    }
    return await this.taskModel.findByIdAndUpdate(id, task, {
      new: true,
      runValidators: true,
    });
  }

  async completeTask(id: string, completed: boolean): Promise<Task> {
    const isValidId = mongoose.isValidObjectId(id);
    if (!isValidId) {
      throw new BadRequestException('Please enter a correct Id');
    }

    const task = await this.taskModel.findByIdAndUpdate(
      id,
      { completed: completed },
      { new: true , runValidators: true},
    );

    if (!task) {
      throw new NotFoundException('Task Not found');
    }

    return task;
  }

  async deleteById(id: string): Promise<void> {
    const isValidId = mongoose.isValidObjectId(id);
    if (!isValidId) {
      throw new BadRequestException('Please enter correct Id');
    }

    const deletedTask = await this.taskModel.findByIdAndDelete(id);
    if (!deletedTask) {
      throw new NotFoundException('Task not found');
    }
  }
}
