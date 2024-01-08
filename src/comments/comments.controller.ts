import { Controller, Get, Param, Post, Body } from '@nestjs/common';
import { CommentsService } from './comments.service';
import { CommentCreateDto } from '../Dtos/CommentCreate.dto';

@Controller('comments')
export class CommentsController {
  constructor(private readonly commentService: CommentsService) {}

  @Get()
  getAllComments() {
    return this.commentService.findAll();
  }

  @Post('/createComment')
  createComment(@Body() commentCreateDto: CommentCreateDto) {
    return this.commentService.createComment(commentCreateDto); 
  }

  @Get('house/:houseId')
  async getCommentsByHouseID(@Param('houseId') HouseID: number) {
    try {
      return this.commentService.getCommentsByHouseID(HouseID);
    } catch (error) {
      // Lidar com erros, por exemplo, imagem não encontrada, etc.
      throw new Error('Erro ao obter o caminho da imagem.');
    }
  }
  @Get('apartment/:apartmentId')
  async getCommentsByApartmentID(@Param('apartmentId') ApartementID: number) {
    try {
      return this.commentService.getCommentsByApartmentID(ApartementID);
    } catch (error) {
      throw new Error('Erro ao obter os comentários do apartamento.');
    }
  }
}
