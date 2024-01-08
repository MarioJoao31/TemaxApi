import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { House } from '../Entitys/House.entity';

@Injectable()
export class HouseService {
  constructor(
    @InjectRepository(House)
    private houseRepository: Repository<House>,
  ) {}
  
  findAll() {
    return this.houseRepository.find();
  }

  async getUserHouses(userID: number) {
    try {
      // Encontre todas as casas associadas ao userID
      const houses = await this.houseRepository.find({
        where: { UserID: userID },
      });
  
      if (!houses || houses.length === 0) {
        throw new NotFoundException(`Não existem casas associadas a este User: ${userID}`);
      }
  
      // Retorna um array de casas
      return await houses;
    } catch (error) {
      console.error('Ocorreu um erro:', error);
      throw new Error('Falha ao obter casas do user');
    }
  }

  async updateHousePrioratyLevel(userID: number) {
    try {
      // Encontre todas as casas associadas ao userID
      const houses = await this.houseRepository.find({
        where: { UserID: userID },
      });

      // Atualiza o Prioraty_level de todas as casas para 1
      houses.forEach(async (house) => {
        house.Prioraty_level = 1;
        await this.houseRepository.save(house);
      });
    } catch (error) {
      console.error('Ocorreu um erro ao atualizar o Prioraty_level:', error);
      throw new Error('Falha ao atualizar o Prioraty_level das casas');
    }
  }



  createHouse(createHouseDto) {
    console.log(createHouseDto);
    try {
      return this.houseRepository.save(createHouseDto);
    } catch (e) {
      // Mensagem caso de erro:
      console.error(e.message);
      throw new Error('Erro ao criar a casa');
    }
  }

  findRentHouses() {
    return this.houseRepository.createQueryBuilder('house')
    .where('LOWER(house.ListingType) LIKE :listingType', {listingType: '%Rent%'})
    .getMany();
  }

  findSellHouses() {
    return this.houseRepository.createQueryBuilder('house')
    .where('LOWER(house.ListingType) LIKE :listingType', {listingType: '%Sell%'})
    .getMany();
  }
}
