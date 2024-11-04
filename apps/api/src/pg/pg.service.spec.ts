import { Test, TestingModule } from '@nestjs/testing';
import { PgService } from './pg.service';

describe('PgService', () => {
  let service: PgService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PgService],
    }).compile();

    service = module.get<PgService>(PgService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
