import { Injectable } from '@nestjs/common';
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
