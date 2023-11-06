import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Residence {
  @PrimaryGeneratedColumn()
  ResidenceID: number;

  @Column({ type: 'int' })
  UserID: number;

  @Column({ type: 'float', nullable: true }) // Make it nullable if Price can be null
  Price: number;

  @Column()
  Type_residence: string;

  @Column({ type: 'int' })
  Construction_year: number;

  @Column({ type: 'int' })
  Parking: number;

  @Column()
  Elevator: string;

  @Column({ type: 'int' })
  Prioraty_level: number;

  @Column()
  Description: string;

  @Column({ type: 'int' })
  Postal_code: number;
}
