import { Injectable } from '@nestjs/common';
import { Coment } from 'src/Entitys/Coment.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CommentCreateDto } from '../Dtos/CommentCreate.dto';

@Injectable()
export class CommentsService {
    constructor(
        @InjectRepository(Coment)
        private readonly comentRepository: Repository<Coment>,
    ) {}
    
    findAll(): Promise<Coment[]> {
        return this.comentRepository.find();
    }

    async createComment(commentCreateDto: CommentCreateDto): Promise<Coment> {
        console.log('Received commentCreateDto:', commentCreateDto);
    
        const comment = new Coment();
        comment.UserID = commentCreateDto.UserID;
        comment.Coment_Text = commentCreateDto.Coment_Text;
        comment.Coment_Datetime = commentCreateDto.Coment_Datetime;
        
        // Verificar se as propriedades estão presentes no DTO antes de atribuir
        if ('RoomID' in commentCreateDto) {
            comment.RoomID = commentCreateDto.RoomID;
        }
        
        if ('HouseID' in commentCreateDto) {
            comment.HouseID = commentCreateDto.HouseID;
        }
        
        if ('ApartementID' in commentCreateDto) {
            comment.ApartementID = commentCreateDto.ApartementID;
        }
    
        // Salvar no banco de dados
        const savedComment = await this.comentRepository.save(comment);
        console.log('Saved comment:', savedComment);
        
        return savedComment;
    }

    async getCommentsByHouseID(HouseID: number): Promise<Coment[]> {
        try {
            return this.comentRepository.find({ where: { HouseID: HouseID } });
        } catch (error) {
            throw new Error('Error retrieving comments.');
        }
    }

    async getCommentsByApartmentID(ApartementID: number): Promise<Coment[]> {
        try {
            return this.comentRepository.find({ where: { ApartementID: ApartementID } });
        } catch (error) {
            throw new Error('Error retrieving comments.');
        }
    }
    
}
