import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Subscription } from './entities/subscription.entity';
import { CreateSubscriptionDto } from './dto/create-subscription.dto';

@Injectable()
export class SubscriptionService {
  constructor(
    @InjectRepository(Subscription)
    private readonly subscriptionRepository: Repository<Subscription>,
  ) {}

  createSubscription(
    createSubscriptionDto: CreateSubscriptionDto,
  ): Promise<Subscription> {
    // const subscription: Subscription = new Subscription();

    // subscription.userId = createSubscriptionDto.userId;
    // subscription.magazineId = createSubscriptionDto.magazineId;
    // subscription.isActive = createSubscriptionDto.isActive;
    // subscription.date = createSubscriptionDto.date;

    return this.subscriptionRepository.save(createSubscriptionDto);
  }

  findAllSubscription(): Promise<Subscription[]> {
    return this.subscriptionRepository.find();
  }

  viewSubscription(id: number): Promise<Subscription> {
    return this.subscriptionRepository.findOneBy({ id });
  }
}
