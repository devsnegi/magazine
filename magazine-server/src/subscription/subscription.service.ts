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
    return this.subscriptionRepository.save(createSubscriptionDto);
  }

  findAllSubscription(): Promise<Subscription[]> {
    return this.subscriptionRepository.find();
  }

  viewSubscription(id: number): Promise<Subscription> {
    return this.subscriptionRepository.findOneBy({ id });
  }

  findSubscriptionByUserId(id: number): Promise<any> {
    return this.subscriptionRepository.findBy({ userId: id });
  }
}
