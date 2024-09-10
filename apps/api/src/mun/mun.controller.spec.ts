import { Test, TestingModule } from '@nestjs/testing';
import { MunController } from './mun.controller';

describe('MunController', () => {
  let controller: MunController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MunController],
    }).compile();

    controller = module.get<MunController>(MunController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
