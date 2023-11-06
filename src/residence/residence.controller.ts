import { Body, Controller, Get, Post } from '@nestjs/common';
import { ResidenceService } from './residence.service';
import { CreateResidenceDto } from '../Dtos/residence-create.dto';

@Controller('residence')
export class ResidenceController {
  constructor(private residenceService: ResidenceService) {}

  //PROTOCOL: Get
  //ROTA: /residence
  //DESC: Amostra todos as residence
  @Get()
  getAllUsers() {
    //vai buscar a funcao ao service
    return this.residenceService.findAll();
  }
  //PROTOCOL: Post
  //ROTA: /residence/create
  //DESC: cria uma residence
  @Post('/create')
  createResidence(@Body() createResidenceDto: CreateResidenceDto) {
    //vai buscar a funcao ao service
    return this.residenceService.createResidence(createResidenceDto);
  }
}
