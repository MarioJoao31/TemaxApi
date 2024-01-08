import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Image } from './image.entity';
@Entity()
export class Apartement {
  @PrimaryGeneratedColumn()
  ApartementID: number;

  @Column()
  UserID: number;

  @Column({ type: 'float' }) // Adding the Price column with type float
  Price: number;

  @Column()
  Construction_year: number;

  @Column()
  Parking: number;

  @Column()
  Elevator: string;

  @Column()
  Prioraty_level: number;

  @Column()
  Description: string;

  @Column()
  Postal_code: string;

  @Column()
  Floor: number;

  @Column()
  Bedrooms: number;

  @Column()
  WCs: number;

  @Column()
  ListingType: string;

  @Column()
  Title: string;
  
  @Column()
  Address: string;
}
