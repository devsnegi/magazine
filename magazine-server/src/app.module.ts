import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { User } from './user/entities/user.entity';
import { Magazine } from './magazine/entities/magazine.entity';
import { MagazineModule } from './magazine/magazine.module';
import { SubscriptionModule } from './subscription/subscription.module';
import { Subscription } from './subscription/entities/subscription.entity';
import { MagSubscriptionModule } from './mag-subscription/mag-subscription.module';
import { MagSubscription } from './mag-subscription/entities/mag-subscription-entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      password: '@developers',
      username: 'postgres',
      entities: [User, Magazine, Subscription, MagSubscription], // here we have added user enitity in entities array
      database: 'user',
      synchronize: true,
      logging: true,
    }),
    UserModule,
    MagazineModule,
    SubscriptionModule,
    MagSubscriptionModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
