import { Module } from '@nestjs/common';
import { ApartementController } from './apartement.controller';
import { ApartementService } from './apartement.service';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Apartement } from '../Entitys/Apartement.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Apartement])],
  controllers: [ApartementController],
  providers: [ApartementService],
})
export class ApartementModule {}
