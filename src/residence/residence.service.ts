import { Injectable } from '@nestjs/common';
import { Residence } from '../Entitys/Residence.entity';
import { InjectRepository } from '@nestjs/typeorm';

import { Repository } from 'typeorm';
import { CreateResidenceDto } from '../Dtos/residence-create.dto';

@Injectable()
export class ResidenceService {
  constructor(
    @InjectRepository(Residence)
    private residenceRespository: Repository<Residence>,
  ) {}
  async findAll(): Promise<Residence[]> {
    return this.residenceRespository.find();
  }

  async createResidence(createResidenceDto: CreateResidenceDto) {
    return this.residenceRespository.save(createResidenceDto);
  }
}
