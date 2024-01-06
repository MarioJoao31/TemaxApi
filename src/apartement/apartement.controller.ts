import { Body, Controller, Get, Param, Post } from '@nestjs/common';

import { ApartementService } from './apartement.service';
import { CreateApartementDto } from 'src/Dtos/Apartement-create.dto';

@Controller('apartement')
export class ApartementController {
  constructor(private apartementService: ApartementService) {}

  //PROTOCOL: Get
  //ROTA: /apartment
  //DESC: Amostra todos os apartamentos
  @Get()
  getAllApartements() {
    //vai buscar a funcao ao service
    return this.apartementService.findAll();
  }

  //PROTOCOL: Get
  // ROTA: /apartement/userApartments/:userID
  // DESC: Retorna todos os apartamentos associados a um usuário específico
  @Get('/:userID')
  getUserApartments(@Param('userID') userID: number) {
    return this.apartementService.findUserApartments(userID);
  }

  //PROTOCOL: Get
  // ROTA: /apartement/rentApartements
  // DESC: Retorna todas os apartamentos disponíveis para aluguel
  @Get('/rentApartements')
  getRentApartments() {
    return this.apartementService.findRentApartments();
  }


  //PROTOCOL: Get
  // ROTA: /apartement/rentApartements
  // DESC: Retorna todas os apartamentos disponíveis para vender
  @Get('/sellApartements')
  getSellApartements() {
    return this.apartementService.findSellApartments();
  }

  //PROTOCOL: Post
  // ROTA: /apartement/createApartement
  // DESC: Cria apartamento
  @Post('/createApartement')
  createApartment(@Body() createApartementDto: CreateApartementDto) {
    return this.apartementService.createApartment(createApartementDto);
  }
}
