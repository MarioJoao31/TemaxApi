import { Body, Controller, Get, Param, Post } from '@nestjs/common';

import { RoomService } from './room.service';
import { CreateRoomDto } from 'src/Dtos/Room-create.dto';

@Controller('room')
export class RoomController {
  constructor(private roomService: RoomService) {}

  // PROTOCOL: Get
  // ROTA: /room
  // DESC: Amostra todos os quartos
  @Get()
  getAllRooms() {
    return this.roomService.findAll();
  }

  // PROTOCOL: Get
  // ROTA: /room/rentRooms
  // DESC: Retorna todos os quartoa disponíveis para aluguel
  @Get('/rentRooms')
  getRentRooms() {
    return this.roomService.findRentRooms();
  }

  // PROTOCOL: Get
  // ROTA: /room/sellRooms
  // DESC: Retorna todos os quartos disponíveis para vender
  @Get('/sellRooms')
  getSellRooms() {
    return this.roomService.findSellRooms();
  }

  //PROTOCOL: Get
  // ROTA: /room/userRooms/:userID
  // DESC: Retorna todas as salas associadas a um usuário específico
  @Get('/:userID')
  getUserRooms(@Param('userID') userID: number) {
    return this.roomService.findUserRooms(userID);
  }

  // PROTOCOL: Post
  // ROTA: /room/createRoom
  // DESC: Cria quarto
  @Post('/createRoom')
  createRoom(@Body() createRoomDto: CreateRoomDto) {
    return this.roomService.createRoom(createRoomDto);
  }
}
