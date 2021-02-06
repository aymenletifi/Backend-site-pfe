import { Transform } from "class-transformer";
import { Types } from "mongoose";

export class PfeDto {
    name: string;
    description: string;
    @Transform(t => Types.ObjectId(t.value))
    supervisor: string;
    @Transform(t => Types.ObjectId(t.value))
    student: string;
    @Transform(t => t.value.map(v => Types.ObjectId(v)))
    tasks: string[];
}