import { Module } from '@nestjs/common';
import { MagSubscriptionController } from './mag-subscription.controller';
import { MagSubscriptionService } from './mag-subscription.service';
import { MagSubscription } from './entities/mag-subscription-entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MagazineService } from 'src/magazine/magazine.service';
import { Magazine } from 'src/magazine/entities/magazine.entity';
import { UserService } from 'src/user/user.service';
import { User } from 'src/user/entities/user.entity';
import { Subscription } from 'src/subscription/entities/subscription.entity';
import { SubscriptionService } from 'src/subscription/subscription.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([MagSubscription]),
    TypeOrmModule.forFeature([Magazine]),
    TypeOrmModule.forFeature([User]),
    TypeOrmModule.forFeature([Subscription]),
  ],
  controllers: [MagSubscriptionController],
  providers: [
    MagSubscriptionService,
    MagazineService,
    UserService,
    SubscriptionService,
  ],
  exports: [MagSubscriptionService],
})
export class MagSubscriptionModule {}
