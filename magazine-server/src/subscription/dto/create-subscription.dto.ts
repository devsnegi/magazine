import { IsInt, IsNotEmpty, IsString, IsEnum, IsDate } from 'class-validator';
import { Type } from 'class-transformer';
export class CreateSubscriptionDto {
  @IsInt()
  @IsNotEmpty()
  magazineId: number;

  @IsInt()
  @IsNotEmpty()
  userId: number;

  isActive: boolean;

  @IsInt()
  price: number;

  @IsString()
  @IsEnum(['weekly', 'monthly', 'yearly'])
  type: string;

  @IsDate()
  @Type(() => Date)
  date: Date;
}
