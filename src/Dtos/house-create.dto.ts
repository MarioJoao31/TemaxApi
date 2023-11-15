// filtro do body
import { IsInt, IsNumber, IsString } from 'class-validator';

export class CreateHouseDto {
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
  Private_gross_area: number;

  @IsInt()
  Total_lot_area: number;

  @IsInt()
  Bedrooms: number;

  @IsInt()
  WCs: number;
}
