import { IsString, IsNumber, IsEmail, IsOptional, IsBoolean, Min, Max } from 'class-validator';

export class CreateReviewDto {
  @IsString()
  customerName: string;

  @IsEmail()
  customerEmail: string;

  @IsNumber()
  @Min(1)
  @Max(5)
  rating: number;

  @IsString()
  comment: string;

  @IsOptional()
  @IsBoolean()
  isVerifiedPurchase?: boolean;

  @IsString()
  bookId: string;
}

export class UpdateReviewDto {
  @IsOptional()
  @IsNumber()
  @Min(1)
  @Max(5)
  rating?: number;

  @IsOptional()
  @IsString()
  comment?: string;

  @IsOptional()
  @IsBoolean()
  isVerifiedPurchase?: boolean;
}
