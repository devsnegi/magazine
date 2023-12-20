import {
  IsAlphanumeric,
  IsEnum,
  IsNotEmpty,
  IsString,
  MinLength,
} from 'class-validator';

export class CreateSubscriptionDto {
  @IsString()
  @MinLength(3, { message: 'Name must have atleast 3 characters.' })
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  @MinLength(3, { message: 'Category must have atleast 3 characters.' })
  @IsAlphanumeric(null, {
    message: 'price does not allow other than alpha numeric chars.',
  })
  price: string;

  @IsString()
  @IsEnum(['monthly', 'quarterly', 'yearly'])
  type: string;
}
