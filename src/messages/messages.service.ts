import { Injectable } from '@nestjs/common';
import { CreateMessageDto } from './dto/create-message.dto';
import { UpdateMessageDto } from './dto/update-message.dto';
import { Message } from './entities/message.entity';
import { channel } from 'diagnostics_channel';

@Injectable()
export class MessagesService {

  messages: Message[] = [{channelID: "0" ,name: "toni", text: "teste"},{channelID: "0", name: "maria", text: "A do mario é a melhor"}];
  clientToUser = {};


  getClientName(clientId: string){
    return this.clientToUser[clientId];
  }

  create(createMessageDto: CreateMessageDto) {
    const message = {
      channelID: createMessageDto.channelID,
      name: createMessageDto.name,
      text: createMessageDto.text
    }
    this.messages.push(message) //TODO: improve func
    return message;
  }

  //retorna todas a mensagens 
  findAll() {
    return this.messages;
  }

  
}
