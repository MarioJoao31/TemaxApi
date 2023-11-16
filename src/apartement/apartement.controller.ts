import { Controller, Get } from '@nestjs/common';

import { ApartementService } from './apartement.service';

@Controller('apartement')
export class ApartementController {
  constructor(private apartementService: ApartementService) {}

  //PROTOCOL: Get
  //ROTA: /user
  //DESC: Amostra todos os users
  @Get()
  getAllApartements() {
    //vai buscar a funcao ao service
    return this.apartementService.findAll();
  }
}
