import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { MagSubscription } from 'src/mag-subscription/entities/mag-subscription-entity';
import { MagSubscriptionService } from 'src/mag-subscription/mag-subscription.service';
import { MagazineService } from 'src/magazine/magazine.service';
import { Magazine } from 'src/magazine/entities/magazine.entity';
import { Subscription } from 'src/subscription/entities/subscription.entity';
import { SubscriptionService } from 'src/subscription/subscription.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    TypeOrmModule.forFeature([MagSubscription]),
    TypeOrmModule.forFeature([Magazine]),
    TypeOrmModule.forFeature([Subscription]),
  ],
  controllers: [UserController],
  providers: [
    UserService,
    MagSubscriptionService,
    MagazineService,
    Subscription,
    SubscriptionService,
  ],
  exports: [UserService],
})
export class UserModule {}
