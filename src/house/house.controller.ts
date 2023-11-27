import { Body, Controller, Get, Post } from '@nestjs/common';

import { HouseService } from './house.service';
import { CreateHouseDto } from '../Dtos/house-create.dto';

@Controller('house')
export class HouseController {
  constructor(private houseService: HouseService) {}

  //PROTOCOL: Get
  // ROTA: /house
  // DESC: Retorna todas as casas
  @Get()
  getAllhouses() {
    //vai buscar a funcao ao service
    return this.houseService.findAll();
  }

  //PROTOCOL: Post
  // ROTA: /house/createHouse
  // DESC: Cria uma nova casa
  @Post('/createHouse')
  createHouse(@Body() createHouseDto: CreateHouseDto) {
    //vai buscar a funcao ao service
    return this.houseService.createHouse(createHouseDto);
  }


  //PROTOCOL: Get
  // ROTA: /house/rentHouses
  // DESC: Retorna todas as casas disponíveis para aluguel
  @Get('/rentHouses')
  getRentHouses(){
    return this.houseService.findRentHouses();
  }

  //PROTOCOL: Get
  // ROTA: /house/rentHouses
  // DESC: Retorna todas as casas disponíveis para aluguel
  @Get('/sellHouses')
  getSellHouses(){
    return this.houseService.findSellHouses();
  }
}
