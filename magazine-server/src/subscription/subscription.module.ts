import { Module } from '@nestjs/common';
import { SubscriptionController } from './subscription.controller';
import { SubscriptionService } from './subscription.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Subscription } from './entities/subscription.entity';
import { MagazineService } from '../magazine/magazine.service';
import { Magazine } from 'src/magazine/entities/magazine.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Subscription]),
    TypeOrmModule.forFeature([Magazine]),
  ],
  controllers: [SubscriptionController],
  providers: [SubscriptionService, MagazineService],
})
export class SubscriptionModule {}
