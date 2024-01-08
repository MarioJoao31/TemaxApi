import { IsNumber } from 'class-validator';

export class ImageDto {
  @IsNumber()
  apartmentId: number;

  @IsNumber()
  houseId: number;

  @IsNumber()
  roomId: number;
  
  // Outros campos necessários podem ser adicionados conforme necessário
}