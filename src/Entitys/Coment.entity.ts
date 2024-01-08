import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Coment {
  @PrimaryGeneratedColumn()
  ComentID: number;

  @Column()
  UserID: number;

  @Column()
  Coment_Text: string;

  @Column()
  Coment_Datetime: Date;

  @Column()
  RoomID: number;

  @Column()
  HouseID: number;

  @Column()
  ApartementID: number;
}
