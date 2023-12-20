import { IsInt, IsNotEmpty, IsString } from 'class-validator';

export class CreateMagSubscriptionDto {
  @IsInt()
  @IsNotEmpty()
  subscriptionId: number;

  @IsInt()
  @IsNotEmpty()
  magazineId: number;

  @IsInt()
  @IsNotEmpty()
  userId: number;

  isActive: boolean;

  // @IsNotEmpty()
  // @IsInt()
  // userEntries: number;

  // @IsNotEmpty()
  // @IsInt()
  // magazineEntries: number;
}
