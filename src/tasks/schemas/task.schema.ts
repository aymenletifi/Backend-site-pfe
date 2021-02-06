import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type TaskDocument = Task & Document;

@Schema()
export class Task {
    @Prop()
    name: string;

    @Prop()
    description: string;

    @Prop()
    dateStart: Date;

    @Prop()
    dateEnd: Date;

    @Prop()
    status: string;

    @Prop()
    progress: number;
}

export const TaskSchema = SchemaFactory.createForClass(Task);