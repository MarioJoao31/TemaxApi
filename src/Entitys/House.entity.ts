import { Entity, Column, PrimaryGeneratedColumn, OneToMany} from 'typeorm';

@Entity()
export class House {
  @PrimaryGeneratedColumn()
  HouseID: number;

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
  Private_gross_area: number;

  @Column()
  Total_lot_area: number;

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
