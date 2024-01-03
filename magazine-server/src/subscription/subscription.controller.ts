import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { SubscriptionService } from './subscription.service';
import { CreateSubscriptionDto } from './dto/create-subscription.dto';

@Controller('subscription')
export class SubscriptionController {
  constructor(private readonly subscriptionService: SubscriptionService) {}

  @Post()
  create(@Body() createSubscriptionDto: CreateSubscriptionDto) {
    return this.subscriptionService.createSubscription(createSubscriptionDto);
  }

  @Get()
  findAll() {
    return this.subscriptionService.findAllSubscription();
  }

  @Get('/user/:id')
  async findSubscriptionByUserId(@Param('id') id: string) {
    return await this.subscriptionService.findSubscriptionByUserId(+id);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.subscriptionService.viewSubscription(+id);
  }
}
