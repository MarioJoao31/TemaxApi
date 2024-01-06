import {
  SubscribeMessage,
  WebSocketGateway,
  OnGatewayConnection,
  OnGatewayDisconnect,
  ConnectedSocket,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';

@WebSocketGateway(8001, { cors: '*' })
export class ChatGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer() server: Server;

  private connectedClients: Map<string, Socket> = new Map();
  private chatMessages: Map<string, any[]> = new Map();

  @SubscribeMessage('joinChat')
  handleJoinChat(
    @ConnectedSocket() client: Socket,
    payload: { userId: string, text: string },
  ) {
    console.log(payload);
    const userId = client.id;

    // Store the client in the connectedClients map
    this.connectedClients.set(userId, client);

    // Check if there is another connected client to create a chat
    const otherClientID = Array.from(this.connectedClients.keys()).find(
      (id) => id !== userId,
    );

    if (otherClientID) {
      const otherClient = this.connectedClients.get(otherClientID);

      // Emit a message to both clients to start the chat
      const chatID = `${userId}-${otherClientID}`;
      this.server.to(client.id).to(otherClient.id).emit('startChat', {
        chatID,
      });

      // Initialize an empty array for the chat messages if it doesn't exist
      if (!this.chatMessages.has(chatID)) {
        this.chatMessages.set(chatID, []);
      }

      console.log(`Chat started between ${userId} and ${otherClientID}`);
      console.log(`Chat ID: ${chatID}`);
    }

    console.log(`User ${userId} connected. Total clients: ${this.connectedClients.size}`);
  }

  @SubscribeMessage('sendMessage')
  handleMessage(@ConnectedSocket() client: Socket, payload: any) {
    console.log(payload);
    const userID = client.id;

    // Use server instance to emit events to all clients in the same room
    this.server.to(userID).emit('chatMessage', {
      senderId: userID,
      timestamp: new Date().toISOString(),
      ...payload,
    });

    // Save the message to the corresponding chat's message array
    const chatID = payload.chatID;
    if (chatID && this.chatMessages.has(chatID)) {
      this.chatMessages.get(chatID).push({
        senderId: userID,
        timestamp: new Date().toISOString(),
        ...payload,
      });
    }
  }

  handleConnection(@ConnectedSocket() client: Socket) {
    // Optional: Handle connection logic if needed
    console.log(`Client connected: ${client.id}`);
  }

  handleDisconnect(@ConnectedSocket() client: Socket) {
    // Optional: Handle disconnection logic if needed
    console.log(`Client disconnected: ${client.id}`);
    this.connectedClients.delete(client.id);

    // Add additional logic for socket hang up
    this.handleSocketHangUp(client);
  }

  private handleSocketHangUp(client: Socket) {
    // Your logic to handle the socket hang up
    console.log(`Socket hang up for client: ${client.id}`);
    // Add any cleanup or specific actions you need
  }
}
