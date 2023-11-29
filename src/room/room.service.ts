import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Room } from 'src/Entitys/Room.entity';
import { Repository } from 'typeorm';
 // Certifique-se de importar corretamente sua entidade Room

@Injectable()
export class RoomService {
  constructor(
    @InjectRepository(Room)
    private roomRepository: Repository<Room>,
  ) {}

  // Lista todos os quartos
  findAll() {
    return this.roomRepository.find();
  }

  // Cria um quarto
  createRoom(createRoomDto) {
    console.log(createRoomDto);

    try {
      return this.roomRepository.save(createRoomDto);
    } catch (e) {
      // Mensagem em caso de erro:
      console.error(e.message);
      throw new Error('Erro ao criar quarto');
    }
  }

  // Lista todas as salas com listingType rent, independentemente de como rent está escrito
  findRentRooms() {
    return this.roomRepository
      .createQueryBuilder('room')
      .where('LOWER(room.ListingType) LIKE :listingType', {
        listingType: '%Rent%',
      })
      .getMany();
  }

  // Lista todas as salas com listingType sell, independentemente de como sell está escrito
  findSellRooms() {
    return this.roomRepository
      .createQueryBuilder('room')
      .where('LOWER(room.ListingType) LIKE :listingType', {
        listingType: '%Sell%',
      })
      .getMany();
  }
}


