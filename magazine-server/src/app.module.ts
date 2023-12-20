import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { User } from './user/entities/user.entity';
import { Magazine } from './magazine/entities/magazine.entity';
import { MagazineModule } from './magazine/magazine.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5433,
      password: 'dev@123',
      username: 'postgres',
      entities: [User, Magazine], // here we have added user enitity in entities array
      database: 'user',
      synchronize: true,
      logging: true,
    }),
    UserModule,
    MagazineModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
