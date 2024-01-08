import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Payment {
  @PrimaryGeneratedColumn()
  PaymentID: number;

  @Column()
  UserID: number;

  @Column({ type: 'float' })
  Price: string;

  @Column()
  Status: string;

  @Column()
  Type_Payment: string;

  @Column()
  Date: Date;
}
