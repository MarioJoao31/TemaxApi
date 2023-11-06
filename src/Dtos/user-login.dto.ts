// filtro do body
import { IsString } from 'class-validator';

export class LoginUserDto {
  @IsString()
  Password: string;

  @IsString()
  Email: string;
}
