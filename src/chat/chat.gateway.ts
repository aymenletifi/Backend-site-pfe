import { WebSocketGateway, WebSocketServer, SubscribeMessage, OnGatewayConnection, OnGatewayDisconnect } from '@nestjs/websockets';
import {Socket, Server} from 'socket.io'
import { ChatService } from './chat/chat.service';
import { Room, RoomDocument } from './schemas/room.schema';

@WebSocketGateway()
export class ChatGateway implements OnGatewayConnection, OnGatewayDisconnect {

    room: RoomDocument;
    constructor(private chatService:ChatService){}

    @WebSocketServer() server;
    users: number = 0;

    async handleConnection(){

        // A client has connected
        this.users++;

        // Notify connected clients of current users
        this.server.emit('users', this.users);

    }

    async handleDisconnect(){

        // A client has disconnected
        this.users--;

        // Notify connected clients of current users
        this.server.emit('users', this.users);

    }


    @SubscribeMessage('chat')
    async onChat(client: Socket, message : {sender: string, text: string, room:string, date: string}){
        client.to(message.room).emit('chat',message)
        this.room = await this.chatService.findRoomById(message.room);
        if(this.room != null){
        this.room.messages.push({sender: message.sender, text: message.text, date: message.date, dateHidden: true})
        this.room.save()
        }
        

    }

    @SubscribeMessage('joinRoom')
    async joinRoom(client: Socket, payload: any){
        this.room = await this.chatService.findRoom(payload.user1,payload.user2);
        if(this.room == null){
            await this.chatService.addRoom(payload.user1, payload.user2);
        }else{
            client.join(this.room.id);
            client.emit("roomJoined", this.room.id)
        }
    }

    @SubscribeMessage('leaveRoom')
    async leaveRoom(client: Socket, room:string){
            client.leave(room);
            console.log('room left', room)
    }

}