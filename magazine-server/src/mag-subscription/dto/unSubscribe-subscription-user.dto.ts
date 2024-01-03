import { IsBoolean } from 'class-validator';

export class UnsubscribeSubscriptionDto {
  @IsBoolean()
  isActive: boolean;

  userId?: number;
  magazineId?: number;
  price?: number;
  type?: string;
  startDate?: Date;
}
