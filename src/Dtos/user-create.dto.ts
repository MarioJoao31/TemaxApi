// filtro do body
import { IsDate, IsInt, IsString } from 'class-validator';

export class CreateUserDto {
  @IsString()
  Name: string;

  @IsString()
  Password: string;

  @IsString()
  Email: string;

  @IsDate()
  Date_birth: Date;

  @IsInt()
  Contact: number;

  @IsInt()
  Permission_level: number;
}
