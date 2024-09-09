import { Test, TestingModule } from '@nestjs/testing';
import { SituationController } from './situation.controller';

describe('SituationController', () => {
  let controller: SituationController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SituationController],
    }).compile();

    controller = module.get<SituationController>(SituationController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
