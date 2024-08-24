import { Test, TestingModule } from '@nestjs/testing';
import { MarcController } from './marc.controller';

describe('MarcController', () => {
  let controller: MarcController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MarcController],
    }).compile();

    controller = module.get<MarcController>(MarcController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
