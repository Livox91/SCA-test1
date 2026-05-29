import { IsString, IsEmail, IsOptional, IsPhoneNumber, Length } from 'class-validator';

export class CreateAuthorDto {
  @IsString()
  @Length(2, 255)
  name: string;

  @IsOptional()
  @IsString()
  biography?: string;

  @IsOptional()
  @IsEmail()
  email?: string;

  @IsOptional()
  @IsString()
  phone?: string;

  @IsOptional()
  @IsString()
  country?: string;
}

export class UpdateAuthorDto {
  @IsOptional()
  @IsString()
  @Length(2, 255)
  name?: string;

  @IsOptional()
  @IsString()
  biography?: string;

  @IsOptional()
  @IsEmail()
  email?: string;

  @IsOptional()
  @IsString()
  phone?: string;

  @IsOptional()
  @IsString()
  country?: string;
}
