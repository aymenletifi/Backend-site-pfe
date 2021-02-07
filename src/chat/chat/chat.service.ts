import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Room, RoomDocument } from '../schemas/room.schema';

@Injectable()
export class ChatService {

    constructor(@InjectModel(Room.name) private roomModel: Model<RoomDocument>){}

    async findRoom(user1: string, user2:string): Promise<RoomDocument | undefined> {
        return this.roomModel.findOne({ $or: [{ user1: user1, user2:user2}, { user1: user2, user2: user1 }]});
      }

    async addRoom(user1 : string, user2: string){
        this.roomModel.create({user1: user1, user2:user2});
      }

    async findMessages(user1: string, user2:string):Promise<any>{
        const room = await this.findRoom(user1, user2);
        return room.messages
    }

    async findRoomById(id: string){
        return this.roomModel.findById(id);
    }

    


}
