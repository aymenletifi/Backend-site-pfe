import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types, Schema as s } from 'mongoose';
import { User } from 'src/users/schemas/user.schema';

export type TaskDocument = Task & Document;

@Schema()
export class Task {
    @Prop()
    name: string;

    @Prop()
    description: string;

    @Prop()
    date_start: Date;

    @Prop()
    date_end: Date;

    @Prop()
    status: string;

    @Prop()
    progress: number;

    @Prop({ type: Types.ObjectId, ref: 'User', default: null })
    student: Types.ObjectId;

    @Prop({ type: Types.ObjectId, ref: 'User', default: null })
    supervisor: Types.ObjectId;
}

export const TaskSchema = SchemaFactory.createForClass(Task);