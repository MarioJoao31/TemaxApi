import { Module } from '@nestjs/common';
import { CommentsService } from './comments.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CommentsController } from './comments.controller';
import { Coment } from 'src/Entitys/Coment.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Coment])],
  providers: [CommentsService],
  controllers: [CommentsController], // Adicionando o CommentsController ao módulo
})
export class CommentsModule {}


