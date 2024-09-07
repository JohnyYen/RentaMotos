import { Test, TestingModule } from '@nestjs/testing';
import { SituationService } from './situation.service';

describe('SituationService', () => {
  let service: SituationService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SituationService],
    }).compile();

    service = module.get<SituationService>(SituationService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
