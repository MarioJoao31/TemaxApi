import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../Entitys/User.entity';
import { Repository } from 'typeorm';
import { CreateUserDto } from '../Dtos/user-create.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  findAll(): Promise<User[]> {
    return this.usersRepository.find();
  }

  createUser(createUserDto: CreateUserDto) {
    try {
      console.log(createUserDto);
      return this.usersRepository.save(createUserDto);
    } catch (e) {
      return e;
    }
  }
}
