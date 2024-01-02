import {
  IsAlphanumeric,
  IsInt,
  IsNotEmpty,
  IsString,
  MinLength,
} from 'class-validator';

export class CreateMagazineDto {
  @IsString()
  @MinLength(3, { message: 'Name must have atleast 3 characters.' })
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  @MinLength(3, { message: 'Category must have atleast 3 characters.' })
  @IsAlphanumeric(null, {
    message: 'Category does not allow other than alpha numeric chars.',
  })
  category: string;

  @IsNotEmpty()
  @MinLength(3, { message: 'Publisher name must have atleast 3 characters.' })
  publication: string;

  @IsInt()
  issue: number;

  @IsString()
  imageurl: string;
}
