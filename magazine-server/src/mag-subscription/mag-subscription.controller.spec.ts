import { Test, TestingModule } from '@nestjs/testing';
import { MagSubscriptionController } from './mag-subscription.controller';

describe('MagSubscriptionController', () => {
  let controller: MagSubscriptionController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MagSubscriptionController],
    }).compile();

    controller = module.get<MagSubscriptionController>(MagSubscriptionController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
