// filtro do body
import { IsInt, IsNumber, IsString } from 'class-validator';

export class CreateApartementDto {
  @IsString()
  UserID: string;

  @IsNumber()
  Price: number;

  @IsString()
  Construction_year: string;

  @IsInt()
  Parking: number;

  @IsString()
  Elevator: string;

  @IsInt()
  Prioraty_level: number;

  @IsString()
  Description: string;

  @IsString()
  Postal_code: string;

  @IsInt()
  Floor: number;

  @IsInt()
  Bedrooms: number;

  @IsInt()
  WCs: number;

  @IsString()
  ListingType: string;
  @IsString()
  Title: string;
  @IsString()
  Address: string;
}
