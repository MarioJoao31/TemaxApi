import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Image {
  @PrimaryGeneratedColumn()
  ImageID: number;

  @Column()
  Image_Dir: string;

  @Column()
  ApartementID: number;

  @Column()
  HouseID: number;

  @Column()
  RoomID: number;
}
