import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ChatGateway } from './chat.gateway';
import { ChatService } from './chat/chat.service';
import { Room, RoomSchema } from './schemas/room.schema';

@Module({
    imports: [MongooseModule.forFeature([{ name: Room.name, schema: RoomSchema }])],
    providers: [ ChatGateway, ChatService ]
})
export class ChatModule {}
