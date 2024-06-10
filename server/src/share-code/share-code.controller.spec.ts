import { Test, TestingModule } from '@nestjs/testing';
import { ShareCodeController } from './share-code.controller';
import { ShareCodeService } from './share-code.service';

describe('ShareCodeController', () => {
  let controller: ShareCodeController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ShareCodeController],
      providers: [ShareCodeService],
    }).compile();

    controller = module.get<ShareCodeController>(ShareCodeController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
