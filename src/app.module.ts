import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './Entitys/User.entity';
import { UsersModule } from './users/users.module';
import { HouseModule } from './house/house.module';
import { House } from './Entitys/House.entity';
import { ApartementModule } from './apartement/apartement.module';
import { Apartement } from './Entitys/Apartement.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '31OutubrO01',
      database: 'Temax',
      entities: [User, House, Apartement],
      synchronize: false,
    }),
    UsersModule,
    HouseModule,
    ApartementModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
