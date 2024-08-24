import { Test, TestingModule } from '@nestjs/testing';
import { MotorcycleController } from './motorcycle.controller';

describe('MotorcycleController', () => {
  let controller: MotorcycleController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MotorcycleController],
    }).compile();

    controller = module.get<MotorcycleController>(MotorcycleController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
