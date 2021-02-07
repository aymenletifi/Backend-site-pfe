import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type UserDocument = User & Document;

@Schema()
export class User {

    @Prop()
    name: string;

    @Prop()
    last_name: string;

    @Prop()
    email: string;

    @Prop()
    password: string;

    @Prop()
    role: string;

    @Prop()
    department: string;

    @Prop()
    phone: string;

    @Prop()
    position: string;

    @Prop()
    supervised: User[];

    @Prop()
    token: string;


}

export const UserSchema = SchemaFactory.createForClass(User);