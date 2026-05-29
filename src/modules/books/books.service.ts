import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Book } from './entities/book.entity';
import { CreateBookDto, UpdateBookDto } from './dto/create-book.dto';
import { Author } from '../authors/entities/author.entity';
import { Category } from '../categories/entities/category.entity';

@Injectable()
export class BooksService {
  constructor(
    @InjectRepository(Book)
    private readonly bookRepository: Repository<Book>,
    @InjectRepository(Author)
    private readonly authorRepository: Repository<Author>,
    @InjectRepository(Category)
    private readonly categoryRepository: Repository<Category>,
  ) {}

  async create(createBookDto: CreateBookDto): Promise<Book> {
    const author = await this.authorRepository.findOne({
      where: { id: createBookDto.authorId },
    });

    if (!author) {
      throw new BadRequestException('Author not found');
    }

    const category = await this.categoryRepository.findOne({
      where: { id: createBookDto.categoryId },
    });

    if (!category) {
      throw new BadRequestException('Category not found');
    }

    const book = this.bookRepository.create({
      ...createBookDto,
      author,
      category,
    });

    return this.bookRepository.save(book);
  }

  async findAll(): Promise<Book[]> {
    return this.bookRepository.find({
      relations: { author: true, category: true },
      order: { createdAt: 'DESC' },
    });
  }

  async findOne(id: string): Promise<Book> {
    const book = await this.bookRepository.findOne({
      where: { id },
      relations: { author: true, category: true },
    });

    if (!book) {
      throw new NotFoundException(`Book with ID ${id} not found`);
    }

    return book;
  }

  async findByCategory(categoryId: string): Promise<Book[]> {
    const category = await this.categoryRepository.findOne({
      where: { id: categoryId },
    });

    if (!category) {
      throw new NotFoundException(`Category with ID ${categoryId} not found`);
    }

    return this.bookRepository.find({
      where: { categoryId },
      relations: { author: true, category: true },
    });
  }

  async findByAuthor(authorId: string): Promise<Book[]> {
    const author = await this.authorRepository.findOne({
      where: { id: authorId },
    });

    if (!author) {
      throw new NotFoundException(`Author with ID ${authorId} not found`);
    }

    return this.bookRepository.find({
      where: { authorId },
      relations: { author: true, category: true },
    });
  }

  async update(id: string, updateBookDto: UpdateBookDto): Promise<Book> {
    const book = await this.findOne(id);

    if (updateBookDto.authorId && updateBookDto.authorId !== book.authorId) {
      const author = await this.authorRepository.findOne({
        where: { id: updateBookDto.authorId },
      });

      if (!author) {
        throw new BadRequestException('Author not found');
      }

      book.author = author;
    }

    if (updateBookDto.categoryId && updateBookDto.categoryId !== book.categoryId) {
      const category = await this.categoryRepository.findOne({
        where: { id: updateBookDto.categoryId },
      });

      if (!category) {
        throw new BadRequestException('Category not found');
      }

      book.category = category;
    }

    Object.assign(book, updateBookDto);
    return this.bookRepository.save(book);
  }

  async remove(id: string): Promise<void> {
    const book = await this.findOne(id);
    await this.bookRepository.remove(book);
  }

  async updateStock(id: string, quantity: number): Promise<Book> {
    const book = await this.findOne(id);

    if (book.stockQuantity + quantity < 0) {
      throw new BadRequestException('Insufficient stock');
    }

    book.stockQuantity += quantity;
    return this.bookRepository.save(book);
  }
}
