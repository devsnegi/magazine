import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { MagSubscription } from './entities/mag-subscription-entity';
import { CreateMagSubscriptionDto } from './dto/create-mag-subscription.dto';
import { MagazineService } from 'src/magazine/magazine.service';
import { UnsubscribeSubscriptionDto } from './dto/unSubscribe-subscription-user.dto';

@Injectable()
export class MagSubscriptionService {
  constructor(
    @InjectRepository(MagSubscription)
    private readonly magsubscriptionRepository: Repository<MagSubscription>,
    private readonly magazineService: MagazineService,
    // private readonly userService: UserService,
  ) {}

  createMagSubscription(
    createMagSubscriptionDto: CreateMagSubscriptionDto,
  ): Promise<MagSubscription> {
    const magSubscription: MagSubscription = new MagSubscription();

    magSubscription.userId = createMagSubscriptionDto.userId;
    magSubscription.magazineId = createMagSubscriptionDto.magazineId;
    magSubscription.isActive = createMagSubscriptionDto.isActive;
    magSubscription.price = createMagSubscriptionDto.price;
    magSubscription.type = createMagSubscriptionDto.type;
    magSubscription.startDate = createMagSubscriptionDto.startDate;
    magSubscription.endDate = createMagSubscriptionDto.endDate;

    return this.magsubscriptionRepository.save(magSubscription);
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
  ): Promise<any> {
    // console.log(`updateSubscription called`, id);
    const currentSubscriptionDetail =
      await this.magsubscriptionRepository.findBy({
        id: id,
      });
    // console.log(`currentSubscriptionDetail:: `, currentSubscriptionDetail);

    return this.magsubscriptionRepository.update(
      id,
      unsubscribeSubscriptionDto,
    );
  }
}
