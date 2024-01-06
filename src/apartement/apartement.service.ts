import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Apartement } from '../Entitys/Apartement.entity';
import { error } from 'console';

@Injectable()
export class ApartementService {
  constructor(
    @InjectRepository(Apartement)
    private apartementRepository: Repository<Apartement>,
  ) {}

  //Listar todos apartamentos
  findAll() {
    return this.apartementRepository.find();
  }

  async findUserApartments(userID: number) {
    try {
      const apartments = await this.apartementRepository.find({
        where: { UserID: userID },
      });

      if (!apartments) {
        throw new NotFoundException(`Não existem apartamentos associados ao usuário com ID: ${userID}`);
      }

      return apartments;
    } catch (error) {
      console.error('Ocorreu um erro:', error);
      throw new Error('Falha ao obter apartamentos do usuário');
    }
  }


  //Criar apartamento
  createApartment(createApartementDto) {
    console.log(createApartementDto);

    try {
      return this.apartementRepository.save(createApartementDto);
    } catch (e) {
      //Mensagem caso de erro:
      console.error(e.message);
      throw new error('Erro ao criar apartamento');
    }
  }

  //Lista todos os apartamentos com listingType rent, independentemente de como rent está escrito
  findRentApartments() {
    return this.apartementRepository
      .createQueryBuilder('apartment')
      .where('LOWER(apartment.ListingType) LIKE :listingType', {
        listingType: '%Rent%',
      })
      .getMany();
  }

  findSellApartments() {
    return this.apartementRepository
      .createQueryBuilder('apartment')
      .where('LOWER(apartment.ListingType) LIKE :listingType', {
        listingType: '%Sell%',
      })
      .getMany();
  }
}
