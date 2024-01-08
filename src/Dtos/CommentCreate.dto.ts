import { IsInt, IsNumber, IsString } from "class-validator";

export class CommentCreateDto {
    
  @IsInt()
  ComentID: number;

  @IsInt()
  UserID: number;

  @IsString()
  Coment_Text: string;

  @IsString()
  Coment_Datetime: Date;

  @IsInt()
  RoomID: number;

  @IsInt()
  HouseID: number;

  @IsInt()
  ApartementID: number;
}