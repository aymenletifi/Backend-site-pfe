import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type PfeDocument = Pfe & Document;

@Schema()
export class Pfe {
    @Prop()
    name: string;

    @Prop()
    description: string;

    @Prop({ type: Types.ObjectId, ref: 'User', default: null })
    student: Types.ObjectId;

    @Prop({ type: Types.ObjectId, ref: 'User', default: null })
    supervisor: Types.ObjectId;

    @Prop({ type: [{ type: Types.ObjectId, ref: 'Task' }] })
    tasks: Types.ObjectId[];
}

export const PfeSchema = SchemaFactory.createForClass(Pfe);