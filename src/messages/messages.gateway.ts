import {
  WebSocketGateway,
  SubscribeMessage,
  MessageBody,
  WebSocketServer,
  ConnectedSocket,
} from '@nestjs/websockets';
import { MessagesService } from './messages.service';
import { CreateMessageDto } from './dto/create-message.dto';
import { Server, Socket } from 'socket.io';
import { CreateChannelDto } from './dto/createChannel.dto';

@WebSocketGateway({ cors: { origin: '*' } })
export class MessagesGateway {
  @WebSocketServer() server: Server;

  // A map to store channel information
  private channels: Map<string, Set<Socket>> = new Map();
  private channelMessages: Map<string, { messages: any[] }> = new Map();

  // quando conectar mandar mensagem
  handleConnection(@ConnectedSocket() client: Socket) {
    // Optional: Handle connection logic if needed
    console.log(`Client connected: ${client.id}`);
  }

  @SubscribeMessage('createChannel')
  handleCreateChannel(
    @MessageBody() userIDs: { userID1: string; userID2: string },
    @ConnectedSocket() client: Socket,
  ) {
    console.log(
      `Received createChannel request with userIDs: ${JSON.stringify(userIDs)}`,
    );
    this.createChannel(userIDs);
  }

  constructor(private readonly messagesService: MessagesService) {}

  @SubscribeMessage('createMessage')
  async create(
    @MessageBody() createMessageDto: CreateMessageDto,
    @ConnectedSocket() client: Socket,
  ) {
    // Check if the message has a channel ID
    if (createMessageDto.channelID) {
      // Check if the channel exists
      const channel = this.channels.get(createMessageDto.channelID);
  
      if (channel) {
        // Update channelMessages with the new message
        const channelData = this.channelMessages.get(createMessageDto.channelID) || { messages: [] };
        channelData.messages.push({
          channelID: createMessageDto.channelID,
          name: createMessageDto.name,
          text: createMessageDto.text,
        });
        this.channelMessages.set(createMessageDto.channelID, channelData);
  
        // Send the message to clients in the channel
        this.sendToChannel(createMessageDto.channelID, 'new message', {
          message: createMessageDto,
          senderId: client.id,
        });
        console.log('mensagem enviada para o channel:', createMessageDto);
        client.emit('new message', createMessageDto);
      } else {
        console.log(`Channel ${createMessageDto.channelID} does not exist.`);
        client.emit('error', 'erro canal não existe');
      }
    } else {
      // Send the message to all clients
      this.server.emit('new message', {
        message: createMessageDto,
        senderId: client.id,
      });
      console.log(
        'mensagem enviada para todos porque n foi para o canal:',
        createMessageDto,
      );
    }
  }

  @SubscribeMessage('findAllMessages')
  findAll(@ConnectedSocket() client: Socket) {
    const messages = this.messagesService.findAll();
    // Assuming your service returns an array of messages

    // log
    messages.forEach((message) => {
      console.log(message);
    });

    client.emit('messages', messages);
  }

  // Function to create a private channel
  private createChannel(userIDs: { userID1: string; userID2: string }) {
    const channelId = `${userIDs.userID1}-${userIDs.userID2}`;
    this.channels.set(channelId, new Set());

     // Update channelMessages to include messages property
    this.channelMessages.set(channelId, { messages: [] });
  
    const clients: Socket[] = [];
    for (const userID of Object.values(userIDs)) {
      const client = this.server.sockets.sockets.get(userID);
      if (client) {
        clients.push(client);
        client.join(channelId);
        this.channels.get(channelId).add(client);
      }
    }
  
    console.log(`Channel created: ${channelId}`);
  }

  private sendToChannel(channelId: string, event: string, data: any) {
    const channel = this.channels.get(channelId);

    if (channel) {
      channel.forEach((member) => member.emit(event, data));
    }
  }

  @SubscribeMessage('getChannelMessages')
  getChannelMessages(
    @MessageBody() createChannelDto: CreateChannelDto,
    @ConnectedSocket() client: Socket,
  ) {
    console.log(`Received getChannelMessages request for channel: ${createChannelDto.channelID}`);
    // Check if the channel exists
    const channel = this.channels.get(createChannelDto.channelID);

    if (channel) {

      console.log(this.channelMessages);

      // Retrieve and send the messages for the specified channel
      const messages = this.channelMessages.get(createChannelDto.channelID) || [];
      const temp = createChannelDto.channelID;
      
      //manda mensagens do canal
      client.emit('channelMessages',  messages );
      console.log(
        `Sent messages from channel ${createChannelDto.channelID} to client ${client.id}`,
      );
    } else {
      console.log(`Channel ${createChannelDto.channelID} does not exist.`);
    }
  }
}
