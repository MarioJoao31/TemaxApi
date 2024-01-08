import { Body, Controller, Get, Param, Post } from '@nestjs/common';

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

  
  //PROTOCOL: Get
  // ROTA: /house/userHouses/:userID
  // DESC: Retorna todas as casas associadas a um usuário específico
  @Get('/:userID')
  getUserHouses(@Param('userID') userID: number) {
    return this.houseService.getUserHouses(userID);
  }


  //PROTOCOL: Post
  // ROTA: /house/createHouse
  // DESC: Cria uma nova casa
  @Post('/createHouse')
  createHouse(@Body() createHouseDto: CreateHouseDto) {
    //vai buscar a funcao ao service
    return this.houseService.createHouse(createHouseDto);
  }

}
