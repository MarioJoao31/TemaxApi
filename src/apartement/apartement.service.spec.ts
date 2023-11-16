import { Test, TestingModule } from '@nestjs/testing';
import { ApartementService } from './apartement.service';

describe('ApartementService', () => {
  let service: ApartementService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ApartementService],
    }).compile();

    service = module.get<ApartementService>(ApartementService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
