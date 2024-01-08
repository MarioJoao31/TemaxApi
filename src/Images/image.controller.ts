import { Controller, Post, UploadedFile, UseInterceptors, Body, ParseIntPipe, Logger, Get, Param } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ImageService } from './image.service';
import { diskStorage, Multer, Express } from 'multer';
import { ImageDto } from '../Dtos/ImageCreate.dto';

@Controller('image')
export class ImageController {
  private readonly logger = new Logger(ImageController.name);

  constructor(private readonly imageService: ImageService) {}

  @Post('upload')
  @UseInterceptors(FileInterceptor('image', {
    storage: diskStorage({
      destination: './imagens',
      filename: (req: Express.Request, file: Express.Multer.File, cb) => {
        cb(null, `${Date.now()}_${file.originalname}`);
      },
    }),
  }))
  async uploadFile( 
    @UploadedFile() image: Express.Multer.File,
    @Body('apartmentId') apartmentId: number,
    @Body('houseId') houseId: number,
    @Body('roomId') roomId: number,
  ) {
    this.logger.debug(`Received image: ${JSON.stringify(image)}`);
    console.log(image);
    
    try {
      const savedImage = await this.imageService.createImage(image);
      return { imagePath: savedImage.imagePath, imageId: savedImage.imageId };
    } catch (error) {
      this.logger.error(`Erro ao criar a imagem: ${error.message}`);
      throw new Error('Erro ao salvar a imagem.');
    }
  }
  
  @Get(':imageId')
  async getImagePathById(@Param('imageId') imageId: number) {
    try {
      const imagePath = await this.imageService.getImagePathById(imageId);
      return { imagePath };
    } catch (error) {
      // Lidar com erros, por exemplo, imagem não encontrada, etc.
      throw new Error('Erro ao obter o caminho da imagem.');
    }
  }
}


