import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../Entitys/User.entity';
import { Repository } from 'typeorm';
import { CreateUserDto } from '../Dtos/user-create.dto';
import { JwtService } from '../auth/jwt.service';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    private readonly jwtService: JwtService,
  ) {}

  findAll(): Promise<User[]> {
    return this.usersRepository.find();
  }

  async createUser(createUserDto: CreateUserDto) {
    try {
      console.log(createUserDto);
      return this.usersRepository.save(createUserDto);
    } catch (e) {
      return e;
    }
  }

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
