import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Image } from '../Entitys/Image.entity';
import { diskStorage, Multer, Express } from 'multer';

@Injectable()
export class ImageService {
  private readonly logger = new Logger(ImageService.name);

  constructor(
    @InjectRepository(Image)
    private readonly imageRepository: Repository<Image>,
  ) {}

  async createImage(image: Express.Multer.File) {
    try {
      const newImage = this.imageRepository.create({
        Image_Dir: image.path,
      });

      const savedImage = await this.imageRepository.save(newImage);
      return {
        imagePath: savedImage.Image_Dir,
        imageId: savedImage.ImageID,
      };
    } catch (error) {
      this.logger.error(`Erro ao salvar a imagem: ${error.message}`);
      throw new Error('Erro ao salvar a imagem.');
    }
  }

  async getImagePathById(imageId: number): Promise<string> {
    try {
      const image = await this.imageRepository.findOne({ where: { ImageID: imageId } });

      if (!image) {
        throw new Error('Imagem não encontrada');
      }

      return image.Image_Dir;
    } catch (error) {
      throw new Error('Erro ao buscar o caminho da imagem.');
    }
  }
}
