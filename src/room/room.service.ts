import { Injectable, NotFoundException } from '@nestjs/common';
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

   // Retorna todas as salas associadas a um usuário específico
   async findUserRooms(userID: number) {
    try {
      const rooms = await this.roomRepository.find({
        where: { UserID: userID },
      });

      if (!rooms) {
        throw new NotFoundException(`Não existem salas associadas ao usuário com ID: ${userID}`);
      }

      return rooms;
    } catch (error) {
      console.error('Ocorreu um erro:', error);
      throw new Error('Falha ao obter salas do usuário');
    }
  }

  async updateRoomPrioratyLevel(userID: number) {
    try {
      // Encontra todos os quartos associados ao userID
      const rooms = await this.roomRepository.find({
        where: { UserID: userID },
      });

      // Atualiza o Prioraty_level de todos os quartos para 1
      rooms.forEach(async (room) => {
        room.Prioraty_level = 1;
        await this.roomRepository.save(room);
      });
    } catch (error) {
      console.error('Ocorreu um erro ao atualizar o Prioraty_level:', error);
      throw new Error('Falha ao atualizar o Prioraty_level dos quartos');
    }
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


