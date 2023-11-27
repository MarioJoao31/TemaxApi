import { Test, TestingModule } from '@nestjs/testing';
import { HouseService } from './house.service';

import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { House } from '../Entitys/House.entity';

describe('HouseService', () => {
  let houseService: HouseService;
  let houseRepository: Repository<House>;

  // This runs before each test case
  beforeEach(async () => {
    // Create a testing module with HouseService and a mock Repository
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        HouseService,
        {
          provide: getRepositoryToken(House),
          useClass: Repository,
        },
      ],
    }).compile();

    // Get instances of HouseService and the mock Repository
    houseService = module.get<HouseService>(HouseService);
    houseRepository = module.get<Repository<House>>(getRepositoryToken(House));
  });

  // This is a simple test case to check if HouseService is defined
  it('should be defined', () => {
    expect(houseService).toBeDefined();
  });

  // This is a test case for the 'findAll' method
  describe('findAll', () => {
    it('should return an array of houses', async () => {
      // Mock data for houses, creates an array of houses
      const mockHouses = [
        {
          UserID: 1234,
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
        },
      ] as House[];

      // Mock the 'find' method of the repository to return the mock data
      jest.spyOn(houseRepository, 'find').mockResolvedValue(mockHouses);

      const result = await houseService.findAll();

      // Assert that the result is equal to the mock data
      expect(result).toEqual(mockHouses);
    });
  });
});
