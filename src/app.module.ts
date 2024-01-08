import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MulterModule } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { v4 as uuidv4 } from 'uuid';

// Importar as entidades e módulos que você já tinha
import { User } from './Entitys/User.entity';
import { House } from './Entitys/House.entity';
import { Apartement } from './Entitys/Apartement.entity';
import { Payment } from './Entitys/Payment.entity';
import { Room } from './Entitys/Room.entity';
import { UsersModule } from './users/users.module';
import { HouseModule } from './house/house.module';
import { ApartementModule } from './apartement/apartement.module';
import { AuthModule } from './auth/auth.module';
import { PaymentModule } from './payment/payment.module';
import { RoomModule } from './room/room.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ImageModule } from './images/images.module'; // Importe o ImageModule
import { Image } from './Entitys/Image.entity'; // Importe a entidade Image
import { CommentsModule } from './comments/comments.module';
import { Coment } from './Entitys/Coment.entity'; 
import { ChatGateway } from './websocket/chat.gateway';
import { MessagesModule } from './messages/messages.module';


@Module({
  imports: [
    
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '31OutubrO01',
      database: 'Temax',
      entities: [User, House, Apartement, Payment, Room, Image, Coment],
      synchronize: false,
    }),
    MulterModule.register({
      storage: diskStorage({
        destination: './imagens',
        filename: (req, file, cb) => {
          const filename: string = uuidv4();
          const extension: string = file.originalname.split('.').pop();
          cb(null, `${filename}.${extension}`);
        },
      }),
    }),
    UsersModule,
    HouseModule,
    ApartementModule,
    AuthModule,
    PaymentModule,
    RoomModule,
    ImageModule,
    CommentsModule,
    MessagesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}