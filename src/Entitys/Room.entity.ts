import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Room {
    @PrimaryGeneratedColumn()
    RoomID: number;

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
    Num_beds: number;

    @Column()
    Private_wc: number;

    @Column()
    Available_kitchen: string;

    @Column()
    ListingType: string;

    @Column()
    Shared_room: string;

    @Column()
    Title: string;

    @Column()
    Address: string;
}