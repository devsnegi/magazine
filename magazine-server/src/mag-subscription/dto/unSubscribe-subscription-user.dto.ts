import { IsBoolean } from 'class-validator';

export class UnsubscribeSubscriptionDto {
  @IsBoolean()
  isActive: boolean;
}
