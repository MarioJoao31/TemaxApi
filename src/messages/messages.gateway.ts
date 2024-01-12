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

  // quando desconectar mandar mensagem
  handleDisconnect(@ConnectedSocket() client: Socket) {
    // Optional: Handle disconnect logic here
    console.log(`Client disconnected: ${client.id}`);
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
        const channelData = this.channelMessages.get(
          createMessageDto.channelID,
        ) || { messages: [] };
        channelData.messages.push({
          channelID: createMessageDto.channelID,
          name: createMessageDto.name,
          text: createMessageDto.text,
          senderId: client.id,
        });
        this.channelMessages.set(createMessageDto.channelID, channelData);

        // Send the message to clients in the channel
        this.sendToChannel(createMessageDto.channelID, 'new message', {
          message: createMessageDto,
          senderId: client.id,
        });
        console.log('mensagem enviada para o channel:', createMessageDto);
        //client.emit('new message', createMessageDto);
      } else {
        console.log(`Channel ${createMessageDto.channelID} does not exist2.`);
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

  private sendToChannel(channelID: string, event: string, data: any) {
    const channel = this.channels.get(channelID);

    if (channel && channelID) {
      // Emitir o evento para todos os clientes no canal
      this.server.to(channelID).emit(event, data);
    }
  }

  @SubscribeMessage('getChannelMessages')
  getChannelMessages(
    @MessageBody() createChannelDto: CreateChannelDto,
    @ConnectedSocket() client: Socket,
  ) {
    console.log(
      `Received getChannelMessages request for channel: ${createChannelDto.channelID}`,
    );
    // Check if the channel exists
    const channel = this.channels.get(createChannelDto.channelID);

    if (channel) {
      console.log(this.channelMessages);

      // Retrieve and send the messages for the specified channel
      const messages =
        this.channelMessages.get(createChannelDto.channelID) || [];
      const temp = createChannelDto.channelID;

      //manda mensagens do canal
      client.emit('channelMessages', messages);

      console.log('messages:', messages);

      console.log(
        `Sent messages from channel ${createChannelDto.channelID} to client ${client.id}`,
      );
    } else {
      console.log(`Channel ${createChannelDto.channelID} does not exist.`);
    }
  }

  @SubscribeMessage('getUserChannels')
  getUserChannels(
    @MessageBody() { userID }: { userID: string },
    @ConnectedSocket() client: Socket,
  ) {
    const userChannels: string[] = [];

    console.log(`Checking channels for user ${userID}`);

    this.channels.forEach((channel, channelId) => {
      if (
        channelId.endsWith(`-${userID}`) ||
        channelId.startsWith(`${userID}-`)
      ) {
        console.log(`User ${userID} is in channel ${channelId}`);
        userChannels.push(channelId);
      }
    });

    console.log(`Channels for user ${userID}:`, userChannels);

    client.emit('userChannels', userChannels);
    console.log(`Sent channels for user ${userID} to client ${client.id}`);
  }

  @SubscribeMessage('joinChannel')
  handleJoinChannel(
    @MessageBody() payload: { channelID: string },
    @ConnectedSocket() client: Socket,
  ) {
    // Validate and sanitize the channelId
    const sanitizedChannelId = this.validateAndSanitizeChannelId(
      payload.channelID,
    );

    // Check if the channel exists
    const channel = this.channels.get(sanitizedChannelId);

    if (channel) {
      // Join the channel
      client.join(sanitizedChannelId);
      console.log(`User ${client.id} joined channel ${sanitizedChannelId}`);
    } else {
      console.log(`Channel ${sanitizedChannelId} does not exist.`);
      client.emit('error', 'Channel does not exist');
    }
  }

  private validateAndSanitizeChannelId(channelId: string): string {
    // Implement your validation and sanitization logic here
    // For simplicity, assuming channelId is valid as it is
    return channelId;
  }
}
