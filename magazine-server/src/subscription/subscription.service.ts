import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Subscription } from './entities/subscription.entity';
import { CreateSubscriptionDto } from './dto/create-subscription.dto';
import { MagazineService } from '../magazine/magazine.service';

@Injectable()
export class SubscriptionService {
  constructor(
    @InjectRepository(Subscription)
    private readonly subscriptionRepository: Repository<Subscription>,
    private readonly magazineService: MagazineService,
  ) {}

  async createSubscription(
    createSubscriptionDto: CreateSubscriptionDto,
  ): Promise<Subscription> {
    const id = createSubscriptionDto.magazineId;
    const { name, category, publication, issue } =
      await this.magazineService.viewMagazine(id);

    return this.subscriptionRepository.save({
      ...createSubscriptionDto,
      name,
      category,
      publication,
      issue,
    });
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
