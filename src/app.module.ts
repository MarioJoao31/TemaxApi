import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './Entitys/User.entity';
import { UsersModule } from './users/users.module';
import { ResidenceModule } from './residence/residence.module';
import { Residence } from './Entitys/Residence.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '31OutubrO01',
      database: 'Temax',
      entities: [User, Residence],
      synchronize: false,
    }),
    UsersModule,
    ResidenceModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
