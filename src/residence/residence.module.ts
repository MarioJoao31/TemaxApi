import { Module } from '@nestjs/common';
import { ResidenceService } from './residence.service';
import { ResidenceController } from './residence.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Residence } from '../Entitys/Residence.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Residence])],
  providers: [ResidenceService],
  controllers: [ResidenceController],
})
export class ResidenceModule {}
