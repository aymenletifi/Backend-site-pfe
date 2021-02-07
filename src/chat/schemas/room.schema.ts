import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type RoomDocument = Room & Document;

@Schema()
export class Room {

    @Prop()
    user1: string;

    @Prop()
    user2: string;

    @Prop()
    messages: [{
        sender :string;
        text:string;
        date:string
    }]
}

export const RoomSchema = SchemaFactory.createForClass(Room);