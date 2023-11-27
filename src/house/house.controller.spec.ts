import { Test, TestingModule } from '@nestjs/testing';
import { HouseController } from './house.controller';
import { HouseService } from './house.service';
import { CreateHouseDto } from '../Dtos/house-create.dto';
import { House } from 'src/Entitys/House.entity';

// Mock the HouseService
jest.mock('./house.service');

describe('HouseController', () => {
  let houseController: HouseController;
  let houseService: HouseService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [HouseController],
      providers: [HouseService],
    }).compile();

    houseController = module.get<HouseController>(HouseController);
    houseService = module.get<HouseService>(HouseService);
  });

  it('should be defined', () => {
    expect(houseController).toBeDefined();
  });

  describe('getAllhouses', () => {
    it('should return an array of houses', async () => {
      const mockHouses: House[] = [
        {
          "HouseID": 1,
          "UserID": 1,
          "Price": 2425,
          "Construction_year": 2001,
          "Parking": 3,
          "Elevator": "Sim",
          "Prioraty_level": 3,
          "Description": "descrição",
          "Postal_code": "4710-306",
          "Private_gross_area": 40,
          "Total_lot_area": 10,
          "Bedrooms": 3,
          "WCs": 2,
          "ListingType": "Sell",
          "Title": "Titulo",
          "Address": "rua santa margarida"
      },
      {
          "HouseID": 2,
          "UserID": 1,
          "Price": 123456,
          "Construction_year": 2001,
          "Parking": 2,
          "Elevator": "Sim",
          "Prioraty_level": 3,
          "Description": "descrio",
          "Postal_code": "4710-321",
          "Private_gross_area": 700,
          "Total_lot_area": 300,
          "Bedrooms": 4,
          "WCs": 2,
          "ListingType": "Rent",
          "Title": "tituloex",
          "Address": "rua do cralh"
      },
      ];
      jest.spyOn(houseService, 'findAll').mockResolvedValue(mockHouses);

      const result = await houseController.getAllhouses();

      expect(result).toEqual(mockHouses);
    });
  });

  describe('createHouse', () => {
    it('should create a new house', async () => {
      const createHouseDto: CreateHouseDto = {
        UserID: 2,
        Price: 500000,
        Construction_year: 2020,
        Parking: 2,
        Elevator: 'Yes',
        Prioraty_level: 1,
        Description: 'Spacious house with a beautiful view',
        Postal_code: '12345',
        Private_gross_area: 200,
        Total_lot_area: 500,
        Bedrooms: 3,
        WCs: 2,
        ListingType: 'Sell',
        Title: 'Beautiful House for Sale',
        Address: '123 Main Street',
      };

      jest.spyOn(houseService, 'createHouse').mockResolvedValue(createHouseDto);

      const result = await houseController.createHouse(createHouseDto);

      expect(result).toEqual(createHouseDto);
    });
  });

  // Add more test cases for getRentHouses, getSellHouses, etc.
});
