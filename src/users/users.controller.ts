import { Body, Controller, Get, Post } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from '../Dtos/user-create.dto';

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

  //PROTOCOL: Post
  //ROTA: /user
  //DESC: Cria user
  @Post('/createUser')
  createUser(@Body() createUserDto: CreateUserDto) {
    //sets default permission levl to 3
    createUserDto.Permission_level = 3;

    return this.usersService.createUser(createUserDto);
  }
}
