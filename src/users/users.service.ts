import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../Entitys/User.entity';
import { Repository } from 'typeorm';
import { CreateUserDto } from '../Dtos/user-create.dto';
import { JwtService } from '../auth/jwt.service';
import { create } from 'domain';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    private readonly jwtService: JwtService,
  ) {}

  //ISI: funcao sincrona
  findAll(): Promise<User[]> {
    return this.usersRepository.find();
  }

  //ISI: SQL QUERY 
  async createUser(createUserDto: CreateUserDto) {
    try {
      console.log(createUserDto);

      const query = ` INSERT INTO User(Name,Email,Password,Contact,Permission_level,Date_birth) VALUES ("${createUserDto.Name}","${createUserDto.Email}","${createUserDto.Password}",${createUserDto.Contact},${createUserDto.Permission_level},"${createUserDto.Date_birth}")`

      const result = await this.usersRepository.query(query)
      return result;
    } catch (e) {
      return e;
    }
  }

  //ISI: criar servico atraves de outro servico
  //ISI: usar servico
  //ISI: funçao assincrona
  //ISI: token
  async loginUser(loginUserDto) {
    return new Promise((resolve, reject) => {
      this.usersRepository
        .findOne({
          where: { Email: loginUserDto.Email, Password: loginUserDto.Password },
        })
        .then((user) => {
          if (!user) {
            resolve("Login doesn't exist!");
          } else {
            // Generate a JWT token with the user's ID as the payload
            const payload = { userId: user.UserID, username: user.Name };
            const token = this.jwtService.signPayload(payload);
            resolve({ userId: user.UserID, token });
          }
        })
        .catch((error) => {
          console.error(error);
          reject('An error occurred during login.');
        });
    });
  }
}
