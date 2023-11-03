import { Controller, Get } from '@nestjs/common';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  //cria o construtor para podermos usar o userservice
  constructor(private usersService: UsersService) {}

  //PROTOCOL: Get
  //ROTA: /user
  //DESC: Amostra todos os users
  @Get()
  getAllUsers() {
    //vai buscar a funcao ao service
    return this.usersService.findAll();
  }
}
