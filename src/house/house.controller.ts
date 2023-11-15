import { Body, Controller, Get, Post } from '@nestjs/common';

import { HouseService } from './house.service';
import { CreateHouseDto } from '../Dtos/house-create.dto';

@Controller('house')
export class HouseController {
  constructor(private houseService: HouseService) {}

  //PROTOCOL: Get
  //ROTA: /user
  //DESC: Amostra todos os users
  @Get()
  getAllUsers() {
    //vai buscar a funcao ao service
    return this.houseService.findAll();
  }

  //PROTOCOL: POst
  //ROTA: /user
  //DESC: Amostra todos os users
  @Post('/createHouse')
  createHouse(@Body() createHouseDto: CreateHouseDto) {
    //vai buscar a funcao ao service
    return this.houseService.createHouse(createHouseDto);
  }
}
