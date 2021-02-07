import { WebSocketGateway, WebSocketServer, SubscribeMessage, OnGatewayConnection, OnGatewayDisconnect } from '@nestjs/websockets';
import {Socket, Server} from 'socket.io'
import { ChatService } from './chat/chat.service';

@WebSocketGateway()
export class ChatGateway implements OnGatewayConnection, OnGatewayDisconnect {

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
    async onChat(client: Socket, message : {sender: string, text: string, room:string}){
        client.to(message.room).emit('chat',message)
    }

    @SubscribeMessage('joinRoom')
    async joinRoom(client: Socket, user1 : string, user2:string){
        const room = await this.chatService.findRoom(user1, user2);
        if(room == null){
            await this.chatService.addRoom(user1, user2);
        }else{
            client.join(room);
        }
    }

    @SubscribeMessage('leaveRoom')
    async leaveRoom(client: Socket, user1 : string, user2:string){
        const room = await this.chatService.findRoom(user1,user2);
        if(room != null){
            client.leave(room);
            client.emit('roomJoined',room)
        }
    }

}