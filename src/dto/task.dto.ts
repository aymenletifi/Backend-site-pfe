import { Transform } from "class-transformer";
import { IsDate, IsNumber } from "class-validator";
import { Types } from "mongoose";

export class TaskDto {
    _id: string;
    name: string;
    description: string;
    dateStart: Date;
    dateEnd: Date;
    status: string;
    progress: number;
    supervisor: string;
    student: string;
}