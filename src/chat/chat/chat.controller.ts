import { Body, Controller, Get,Post } from '@nestjs/common';
import { ChatService } from './chat.service';

@Controller('chat')
export class ChatController {

    constructor(private chatService: ChatService){
    }

    @Post('messages')
    getStudents(@Body() body){
        return this.chatService.findMessages(body.user1, body.user2);
    }

}
