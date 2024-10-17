import {
  IsEmail,
  IsNumber,
  IsOptional,
  IsPhoneNumber,
  IsString,
} from 'class-validator';

export class UpdateVolunteerDto {
  @IsString()
  @IsOptional()
  surname: string;

  @IsString()
  name: string;

  @IsOptional()
  @IsString()
  patronymic: string;

  @IsPhoneNumber()
  phone: string;

  @IsOptional()
  @IsEmail()
  email: string;

  @IsOptional()
  @IsNumber()
  rating: number;

  @IsOptional()
  @IsString()
  projects: [];
}
