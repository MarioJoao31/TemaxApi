import { Body, Controller, Get, Post, Param } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from '../Dtos/user-create.dto';
import { LoginUserDto } from '../Dtos/user-login.dto';

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
  //ROTA: /users/createUser
  //DESC: Cria user
  @Post('/createUser')
  createUser(@Body() createUserDto: CreateUserDto) {
    //sets default permission levl to 3
    createUserDto.Permission_level = 3;

    return this.usersService.createUser(createUserDto);
  }

  //PROTOCOL: Post
  //ROTA: /users/login
  //DESC: Cria user
  @Post('/login')
  loginUser(@Body() loginUserDto: LoginUserDto) {
    return this.usersService.loginUser(loginUserDto);
  }

  @Get('/:userID/name')
  async getUserNameById(@Param('userID') userID: number) {
    
      console.log('UserID:', userID);
      const userName = await this.usersService.getUserNameById(userID);
      console.log(userName);
      return this.usersService.getUserNameById(userID);
  
 }
}
