import { Injectable } from '@nestjs/common';
import { CreateMessageDto } from './dto/create-message.dto';
import { UpdateMessageDto } from './dto/update-message.dto';
import { Message } from './entities/message.entity';

@Injectable()
export class MessagesService {

  messages: Message[] = [{name: "toni", text: "teste"}];
  clientToUser = {};

  identify(name: string, clientId: string){
    this.clientToUser[clientId]= name;

    return Object.values(this.clientToUser);
  }

  getClientName(clientId: string){
    return this.clientToUser[clientId];
  }

  create(createMessageDto: CreateMessageDto) {
    const message = {...createMessageDto}
    return this.messages.push(createMessageDto); //TODO: improve func
  }

  //retorna todas a mensagens 
  findAll() {
    return this.messages;
  }

  findOne(id: number) {
    return `This action returns a #${id} message`;
  }

  update(id: number, updateMessageDto: UpdateMessageDto) {
    return `This action updates a #${id} message`;
  }

  remove(id: number) {
    return `This action removes a #${id} message`;
  }
}
