import { Test, TestingModule } from '@nestjs/testing';
import { ApartementController } from './apartement.controller';

describe('ApartementController', () => {
  let controller: ApartementController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ApartementController],
    }).compile();

    controller = module.get<ApartementController>(ApartementController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
