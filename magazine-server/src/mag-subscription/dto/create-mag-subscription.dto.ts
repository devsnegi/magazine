import { IsInt, IsNotEmpty, IsDate, IsString, IsEnum } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateMagSubscriptionDto {
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
  startDate: Date;

  @IsDate()
  @Type(() => Date)
  endDate: Date;
}
