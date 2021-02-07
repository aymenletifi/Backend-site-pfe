import { WebSocketGateway, WebSocketServer, SubscribeMessage, OnGatewayConnection, OnGatewayDisconnect } from '@nestjs/websockets';
import {Socket, Server} from 'socket.io'

@WebSocketGateway()
export class ChatGateway implements OnGatewayConnection, OnGatewayDisconnect {

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
    async joinRoom(client: Socket, room : string){
        client.join(room);
        client.emit('roomJoined',room)
    }
    @SubscribeMessage('leaveRoom')
    async leaveRoom(client: Socket, room : string){
        client.leave(room);
        client.emit('roomJoined',room)
    }

}