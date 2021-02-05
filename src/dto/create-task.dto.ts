import { Transform } from "class-transformer";
import { Types } from "mongoose";

export class TaskDto {
    name: string;
    description: string;
    date_start: Date;
    date_end: Date;
    status: string;
    progress: number;
    @Transform(v => v.value ? Types.ObjectId.createFromHexString(v.value) : null)
    supervisor: Types.ObjectId;
    @Transform(v => v.value ? Types.ObjectId.createFromHexString(v.value) : null)
    student: Types.ObjectId;
}