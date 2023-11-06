import { IsInt, IsString } from 'class-validator';

export class CreateResidenceDto {
  @IsInt()
  UserID: number;

  @IsInt()
  Price: number;

  @IsString()
  Type_residence: string;

  @IsInt()
  Construction_year: number;

  @IsInt()
  Parking: number;

  @IsString()
  Elevator: string;

  @IsInt()
  Prioraty_level: number;

  @IsString()
  Description: string;

  @IsString()
  Postal_code: number;
}
