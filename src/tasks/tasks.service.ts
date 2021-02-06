import { ClassSerializerInterceptor, Injectable, UseInterceptors } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Query, Types } from 'mongoose';
import { TaskDto } from 'src/dto/task.dto';
import { Task, TaskDocument } from './schemas/task.schema';

@Injectable()
export class TasksService {
    constructor(@InjectModel(Task.name) private tasksModel: Model<TaskDocument>) { }

    async findAll(): Promise<Task[] | undefined> {
        return this.tasksModel.find({}, { __v: false });;
    }

    async createTask(task: TaskDto): Promise<any> {
        task._id = Types.ObjectId() + "";
        const createdTask = new this.tasksModel(task);
        return { id: (await createdTask.save()).id };
    }

    async deleteTask(id: string): Promise<any> {
        return this.tasksModel.deleteOne({_id: id}).exec();
    }

    async updateTask(id: string, task: TaskDto): Promise<any> {
        return this.tasksModel.updateOne({_id: id}, task).exec();
    }
}
