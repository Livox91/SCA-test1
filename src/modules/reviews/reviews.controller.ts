import { Controller, Get, Post, Body, Patch, Param, Delete, HttpCode, HttpStatus } from '@nestjs/common';
import { ApiTags, ApiCreatedResponse, ApiOkResponse } from '@nestjs/swagger';
import { ReviewsService } from './reviews.service';
import { Review } from './entities/review.entity';
import { CreateReviewDto, UpdateReviewDto } from './dto/create-review.dto';

@ApiTags('reviews')
@Controller('reviews')
export class ReviewsController {
  constructor(private readonly reviewsService: ReviewsService) {}

  @Post()
  @ApiCreatedResponse({ description: 'Review created successfully', type: Review })
  create(@Body() createReviewDto: CreateReviewDto): Promise<Review> {
    return this.reviewsService.create(createReviewDto);
  }

  @Get()
  @ApiOkResponse({ description: 'All reviews', type: [Review] })
  findAll(): Promise<Review[]> {
    return this.reviewsService.findAll();
  }

  @Get('book/:bookId')
  @ApiOkResponse({ description: 'Reviews for a specific book', type: [Review] })
  findByBook(@Param('bookId') bookId: string): Promise<Review[]> {
    return this.reviewsService.findByBook(bookId);
  }

  @Get(':id')
  @ApiOkResponse({ description: 'Review by ID', type: Review })
  findOne(@Param('id') id: string): Promise<Review> {
    return this.reviewsService.findOne(id);
  }

  @Patch(':id')
  @ApiOkResponse({ description: 'Review updated', type: Review })
  update(
    @Param('id') id: string,
    @Body() updateReviewDto: UpdateReviewDto,
  ): Promise<Review> {
    return this.reviewsService.update(id, updateReviewDto);
  }

  @Patch(':id/helpful')
  @ApiOkResponse({ description: 'Review marked as helpful', type: Review })
  markHelpful(@Param('id') id: string): Promise<Review> {
    return this.reviewsService.markHelpful(id);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@Param('id') id: string): Promise<void> {
    return this.reviewsService.remove(id);
  }
}
