import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  UserID: number;

  @Column({ default: 3 })
  Permission_level: number;

  @Column()
  Password: string;

  @Column()
  Name: string;

  @Column()
  Email: string;

  @Column({ type: 'date' })
  Date_birth: Date;

  @Column()
  Contact: number;
}
