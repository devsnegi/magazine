import { Controller, Get, Post, Body, Param, Patch } from '@nestjs/common';
import { MagSubscriptionService } from './mag-subscription.service';
import { CreateMagSubscriptionDto } from './dto/create-mag-subscription.dto';
import { UnsubscribeSubscriptionDto } from './dto/unSubscribe-subscription-user.dto';

@Controller('mag-subscription')
export class MagSubscriptionController {
  constructor(
    private readonly magSubscriptionService: MagSubscriptionService,
  ) {}

  @Post()
  create(@Body() createMagSubscriptionDto: CreateMagSubscriptionDto) {
    return this.magSubscriptionService.createMagSubscription(
      createMagSubscriptionDto,
    );
  }

  @Get()
  findAll() {
    return this.magSubscriptionService.findAllMagSubscription();
  }

  @Patch(':id/unsubcribe')
  async update(
    @Param('id') id: string,
    @Body() unsubscribeSubscriptionDto: UnsubscribeSubscriptionDto,
  ) {
    return await this.magSubscriptionService.updateSubcription(
      +id,
      unsubscribeSubscriptionDto,
    );
  }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.magSubscriptionService.viewMagSubscription(+id);
  // }
}
