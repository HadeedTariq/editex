import { Test, TestingModule } from '@nestjs/testing';
import { ShareCodeService } from './share-code.service';

describe('ShareCodeService', () => {
  let service: ShareCodeService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ShareCodeService],
    }).compile();

    service = module.get<ShareCodeService>(ShareCodeService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
