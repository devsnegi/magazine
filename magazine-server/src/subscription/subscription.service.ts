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
    const subscription: Subscription = new Subscription();

    subscription.name = createSubscriptionDto.name;
    subscription.price = createSubscriptionDto.price;
    subscription.type = createSubscriptionDto.type;

    return this.subscriptionRepository.save(subscription);
  }

  findAllSubscription(): Promise<Subscription[]> {
    return this.subscriptionRepository.find();
  }

  viewSubscription(id: number): Promise<Subscription> {
    return this.subscriptionRepository.findOneBy({ id });
  }
}
