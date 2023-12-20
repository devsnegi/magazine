import { Test, TestingModule } from '@nestjs/testing';
import { MagSubscriptionService } from './mag-subscription.service';

describe('MagSubscriptionService', () => {
  let service: MagSubscriptionService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MagSubscriptionService],
    }).compile();

    service = module.get<MagSubscriptionService>(MagSubscriptionService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
