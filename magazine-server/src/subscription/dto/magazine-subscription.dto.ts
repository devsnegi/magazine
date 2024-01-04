import { IntersectionType } from '@nestjs/mapped-types';
import { CreateSubscriptionDto } from './create-subscription.dto';
import { CreateMagazineDto } from '../../magazine/dto/create-magazine.dto';

export class MagazineSubscriptionDto extends IntersectionType(
  CreateSubscriptionDto,
  CreateMagazineDto,
) {}
