import { IsInt, IsNumber, IsString } from "class-validator";

export class CreateRoomDto {
    
    @IsString()
    UserID: string;

    @IsNumber()
    Price: number;

    @IsString()
    Construction_year: string;

    @IsInt()
    Parking: number;

    @IsString()
    Elevator: string;

    @IsInt()
    Prioraty_level: number;

    @IsString()
    Description: string;

    @IsString()
    Postal_code: string;

    @IsInt()
    Num_beds: number;

    @IsString()
    Private_wc: string;

    @IsString()
    Available_kitchen: string;

    @IsString()
    ListingType: string;

    @IsString()
    Shared_room: string;

    @IsString()
    Title: string;

    @IsString()
    Address: string;
}