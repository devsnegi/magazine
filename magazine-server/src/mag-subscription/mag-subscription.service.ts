import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { MagSubscription } from './entities/mag-subscription-entity';
import { CreateMagSubscriptionDto } from './dto/create-mag-subscription.dto';
import { MagazineService } from 'src/magazine/magazine.service';
import { UnsubscribeSubscriptionDto } from './dto/unSubscribe-subscription-user.dto';
// import { UserService } from 'src/user/user.service';

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

    magSubscription.subscriptionId = createMagSubscriptionDto.subscriptionId;
    magSubscription.userId = createMagSubscriptionDto.userId;
    magSubscription.magazineId = createMagSubscriptionDto.magazineId;

    // magSubscription.userEntriesId = createMagSubscriptionDto.userEntries;
    // magSubscription.magazineEntries = createMagSubscriptionDto.magazineEntries;

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
      // isActive: true,
    });
    console.log(`allSubscriptionsList:::: `, allSubscriptionsList);
    const promises = [];
    const usersPromise = [];
    const orderOfKeys = [];
    const orderOfUserKeys = [];
    const self = this;

    console.log(`allSubscriptionsList: `, allSubscriptionsList);

    for (const magazineData in allSubscriptionsList) {
      console.log(`magazineData:::::::: `, magazineData);
      promises.push(
        self.magazineService.viewMagazine(
          allSubscriptionsList[magazineData].magazineId,
        ),
      );
      // promises.push(allSubscriptionsList[magazineData]);
      orderOfKeys.push(magazineData); // Memoize the keys, now the index matches the proper key
    }

    // for (const userData in allSubscriptionsList) {
    //   usersPromise.push(
    //     self.userService.viewUser(allSubscriptionsList[userData].userId),
    //   );
    //   orderOfUserKeys.push(userData); // Memoize the keys, now the index matches the proper key
    // }

    const finalData = await Promise.all(promises).then((responseArr) => {
      const magazineData = [];
      for (let i = 0; i < responseArr.length; i++) {
        // magazineData[orderOfKeys[i]] = responseArr[i];
        magazineData.push(responseArr[i]);
        if (i === responseArr.length - 1) {
          allSubscriptionsList.forEach((object, ind) => {
            console.log(`object: `, object);
            // object.magazineDetail = JSON.stringify(magazineData[ind]);
            object.magazineDetail = responseArr.find(
              (data) => data.id === object.magazineId,
            );
          });
        }
      }
      console.log(`magazineData:-- `, magazineData);

      return responseArr;
    });

    // const finalUserData = await Promise.all(promises).then((responseArr) => {
    //   const userData = [];
    //   for (let i = 0; i < responseArr.length; i++) {
    //     // magazineData[orderOfKeys[i]] = responseArr[i];
    //     const userData = [];
    //     userData.push(responseArr[i]);
    //     if (i === responseArr.length - 1) {
    //       allSubscriptionsList.forEach((object, ind: number) => {
    //         console.log(`object: `, object);
    //         object.userDetail = responseArr.find(
    //           (data) => data.id === object.magazineId,
    //         );
    //       });
    //     }
    //   }
    //   console.log(`userData:-- `, userData);

    //   return responseArr;
    // });
    console.log(`final allSubscriptionsList: `, allSubscriptionsList);

    return allSubscriptionsList;
  }

  async updateSubcription(
    id: number,
    unsubscribeSubscriptionDto: UnsubscribeSubscriptionDto,
  ): Promise<any> {
    console.log(`updateSubscription called`, id);
    const currentSubscriptionDetail = await this.magsubscriptionRepository.findBy({
        id: id,
      });
    console.log(`currentSubscriptionDetail:: `, currentSubscriptionDetail);

    return this.magsubscriptionRepository.update(
      id,
      unsubscribeSubscriptionDto,
    );
    // const magSubcription: MagSubscription = new MagSubscription();
    // magSubcription.isActive = unsubscribeSubscriptionDto.isActive;
    // // @ts-expect-error temp
    // magSubcription.subscriptionId = currentSubscriptionDetail.subscriptionId;
    // return this.magsubscriptionRepository.save(magSubcription);
  }
}
