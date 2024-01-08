import { Module } from '@nestjs/common';
import { ImageController } from './image.controller';
import { ImageService } from './image.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Image } from '../Entitys/Image.entity'; // Certifique-se de ajustar o caminho do arquivo da entidade

@Module({
  imports: [TypeOrmModule.forFeature([Image])], // Importa a entidade Image
  controllers: [ImageController], // Registra o controlador relacionado a Image
  providers: [ImageService], // Registra o serviço relacionado a Image
})
export class ImageModule {}
