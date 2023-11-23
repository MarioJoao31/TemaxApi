// filtro do body
import { IsDate, IsInt, IsNumber, IsString } from 'class-validator';

export class CreatePaymentDto {
  @IsInt()
  UserID: number;

  @IsNumber()
  Price: number;

  @IsString()
  Status: string;

  @IsString()
  Type_Payment: string;

  @IsDate()
  Date: Date;
}
