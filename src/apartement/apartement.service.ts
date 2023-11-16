import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Apartement } from '../Entitys/Apartement.entity';

@Injectable()
export class ApartementService {
  constructor(
    @InjectRepository(Apartement)
    private apartementRepository: Repository<Apartement>,
  ) {}
  findAll() {}
}
