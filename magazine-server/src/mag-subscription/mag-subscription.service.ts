import { Injectable, Module } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { MagSubscription } from './entities/mag-subscription-entity';
import { CreateMagSubscriptionDto } from './dto/create-mag-subscription.dto';
import { MagazineService } from 'src/magazine/magazine.service';
import { UnsubscribeSubscriptionDto } from './dto/unSubscribe-subscription-user.dto';

import { CreateSubscriptionDto } from '../subscription/dto/create-subscription.dto';
// import { Subscription } from '../subscription/entities/subscription.entity';
import { SubscriptionService } from '../subscription/subscription.service';
// @Module({
//   imports: [Subscription],
// })
@Injectable()
export class MagSubscriptionService {
  constructor(
    @InjectRepository(MagSubscription)
    private readonly magsubscriptionRepository: Repository<MagSubscription>,
    // private readonly subscriptionRepository: Repository<Subscription>,
    private readonly subscriptionService: SubscriptionService,
    private readonly magazineService: MagazineService,
    // private readonly userService: UserService,
  ) {}

  async createMagSubscription(
    createMagSubscriptionDto: CreateMagSubscriptionDto,
  ): Promise<MagSubscription> {
    const createSubscriptionDto: CreateSubscriptionDto = {
      userId: createMagSubscriptionDto.userId,
      magazineId: createMagSubscriptionDto.magazineId,
      isActive: createMagSubscriptionDto.isActive,
      price: createMagSubscriptionDto.price,
      type: createMagSubscriptionDto.type,
      date: createMagSubscriptionDto.startDate,
    };
    console.log(`createSubscriptionDto: `, createSubscriptionDto);

    const newSubscription = await this.magsubscriptionRepository.save(
      createMagSubscriptionDto,
    );
    try {
      const subscriptionActivity =
        await this.subscriptionService.createSubscription(
          createSubscriptionDto,
        );
      console.log(`subscriptionActivity::::: `, subscriptionActivity);
    } catch (err) {
      console.error(err);
    }
    return newSubscription;
  }

  findAllMagSubscription(): Promise<MagSubscription[]> {
    return this.magsubscriptionRepository.findBy({
      isActive: true,
    });
  }

  async getAllMagazineSubscriptionByUserId(id: number): Promise<any> {
    const allSubscriptionsList = await this.magsubscriptionRepository.findBy({
      userId: id,
    });
    // console.log(`allSubscriptionsList:::: `, allSubscriptionsList);
    const promises = [];
    const orderOfKeys = [];
    const self = this;

    for (const magazineData in allSubscriptionsList) {
      promises.push(
        self.magazineService.viewMagazine(
          allSubscriptionsList[magazineData].magazineId,
        ),
      );
      orderOfKeys.push(magazineData); // Memoize the keys, now the index matches the proper key
    }

    return allSubscriptionsList;
  }

  async updateSubcription(
    id: number,
    unsubscribeSubscriptionDto: UnsubscribeSubscriptionDto,
    // createSubscriptionDto: CreateSubscriptionDto,
  ): Promise<any> {
    const createSubscriptionDto: CreateSubscriptionDto = {
      userId: unsubscribeSubscriptionDto.userId,
      magazineId: unsubscribeSubscriptionDto.magazineId,
      isActive: unsubscribeSubscriptionDto.isActive,
      price: unsubscribeSubscriptionDto.price,
      type: unsubscribeSubscriptionDto.type,
      date: unsubscribeSubscriptionDto.startDate,
    };
    const updatedSubscription = await this.magsubscriptionRepository.update(
      id,
      { isActive: unsubscribeSubscriptionDto.isActive },
    );
    const subscriptionActivity =
      await this.subscriptionService.createSubscription(createSubscriptionDto);
    return updatedSubscription;
  }
}
