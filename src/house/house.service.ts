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
    } catch (e) {}
  }
}
