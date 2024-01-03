import { Controller, Get, Post, Body, Param, Patch } from '@nestjs/common';
import { MagSubscriptionService } from './mag-subscription.service';
import { CreateMagSubscriptionDto } from './dto/create-mag-subscription.dto';
import { CreateSubscriptionDto } from '../subscription/dto/create-subscription.dto';
import { UnsubscribeSubscriptionDto } from './dto/unSubscribe-subscription-user.dto';

@Controller('mag-subscription')
export class MagSubscriptionController {
  constructor(
    private readonly magSubscriptionService: MagSubscriptionService,
  ) {}

  @Post()
  create(
    @Body() createMagSubscriptionDto: CreateMagSubscriptionDto,
    createSubscriptionDto: CreateSubscriptionDto,
  ) {
    return this.magSubscriptionService.createMagSubscription(
      createMagSubscriptionDto,
      // createSubscriptionDto,
    );
  }

  @Get()
  findAll() {
    return this.magSubscriptionService.findAllMagSubscription();
  }

  @Patch(':id/unsubscribe')
  async update(
    @Param('id') id: string,
    @Body() unsubscribeSubscriptionDto: UnsubscribeSubscriptionDto,
  ) {
    console.log('unsubscribeSubscriptionDto:---', unsubscribeSubscriptionDto);
    return await this.magSubscriptionService.updateSubcription(
      +id,
      unsubscribeSubscriptionDto,
    );
  }
}
