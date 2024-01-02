import { IsInt, IsNotEmpty, IsDate } from 'class-validator';
import { Type } from 'class-transformer';
export class CreateSubscriptionDto {
  @IsInt()
  @IsNotEmpty()
  magazineId: number;

  @IsInt()
  @IsNotEmpty()
  userId: number;

  isActive: boolean;

  @IsDate()
  @Type(() => Date)
  date: Date;
}
