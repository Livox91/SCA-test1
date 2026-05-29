import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Review } from './entities/review.entity';
import { Book } from '../books/entities/book.entity';
import { CreateReviewDto, UpdateReviewDto } from './dto/create-review.dto';

@Injectable()
export class ReviewsService {
  constructor(
    @InjectRepository(Review)
    private readonly reviewRepository: Repository<Review>,
    @InjectRepository(Book)
    private readonly bookRepository: Repository<Book>,
  ) {}

  async create(createReviewDto: CreateReviewDto): Promise<Review> {
    const book = await this.bookRepository.findOne({
      where: { id: createReviewDto.bookId },
    });

    if (!book) {
      throw new BadRequestException('Book not found');
    }

    const review = this.reviewRepository.create({
      ...createReviewDto,
      book,
    });

    const savedReview = await this.reviewRepository.save(review);

    // Update book rating
    await this.updateBookRating(createReviewDto.bookId);

    return savedReview;
  }

  async findAll(): Promise<Review[]> {
    return this.reviewRepository.find({
      relations: { book: true },
      order: { createdAt: 'DESC' },
    });
  }

  async findByBook(bookId: string): Promise<Review[]> {
    const book = await this.bookRepository.findOne({
      where: { id: bookId },
    });

    if (!book) {
      throw new NotFoundException(`Book with ID ${bookId} not found`);
    }

    return this.reviewRepository.find({
      where: { bookId },
      relations: { book: true },
      order: { helpfulCount: 'DESC', createdAt: 'DESC' },
    });
  }

  async findOne(id: string): Promise<Review> {
    const review = await this.reviewRepository.findOne({
      where: { id },
      relations: { book: true },
    });

    if (!review) {
      throw new NotFoundException(`Review with ID ${id} not found`);
    }

    return review;
  }

  async update(id: string, updateReviewDto: UpdateReviewDto): Promise<Review> {
    const review = await this.findOne(id);

    Object.assign(review, updateReviewDto);
    const updatedReview = await this.reviewRepository.save(review);

    // Update book rating
    await this.updateBookRating(review.bookId);

    return updatedReview;
  }

  async remove(id: string): Promise<void> {
    const review = await this.findOne(id);
    const bookId = review.bookId;

    await this.reviewRepository.remove(review);

    // Update book rating
    await this.updateBookRating(bookId);
  }

  async markHelpful(id: string): Promise<Review> {
    const review = await this.findOne(id);
    review.helpfulCount += 1;
    return this.reviewRepository.save(review);
  }

  private async updateBookRating(bookId: string): Promise<void> {
    const reviews = await this.reviewRepository.find({
      where: { bookId },
    });

    if (reviews.length === 0) {
      await this.bookRepository.update(bookId, {
        rating: 0,
        reviewCount: 0,
      });
      return;
    }

    const averageRating = reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length;

    await this.bookRepository.update(bookId, {
      rating: parseFloat(averageRating.toFixed(2)),
      reviewCount: reviews.length,
    });
  }
}
