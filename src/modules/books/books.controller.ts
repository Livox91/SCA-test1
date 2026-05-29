import { Controller, Get, Post, Body, Patch, Param, Delete, HttpCode, HttpStatus, Query } from '@nestjs/common';
import { ApiTags, ApiCreatedResponse, ApiOkResponse } from '@nestjs/swagger';
import { BooksService } from './books.service';
import { Book } from './entities/book.entity';
import { CreateBookDto, UpdateBookDto } from './dto/create-book.dto';
import { SearchBooksDto } from '../../common/dto/pagination.dto';

@ApiTags('books')
@Controller('books')
export class BooksController {
  constructor(private readonly booksService: BooksService) {}

  @Post()
  @ApiCreatedResponse({ description: 'Book created successfully', type: Book })
  create(@Body() createBookDto: CreateBookDto): Promise<Book> {
    return this.booksService.create(createBookDto);
  }

  @Get()
  @ApiOkResponse({ description: 'All books', type: [Book] })
  findAll(): Promise<Book[]> {
    return this.booksService.findAll();
  }

  @Get('search')
  @ApiOkResponse({ description: 'Search books' })
  search(@Query() searchDto: SearchBooksDto): Promise<{ data: Book[]; meta: any }> {
    return this.booksService.searchBooks(searchDto);
  }

  @Get('by-category/:categoryId')
  @ApiOkResponse({ description: 'Books by category', type: [Book] })
  findByCategory(@Param('categoryId') categoryId: string): Promise<Book[]> {
    return this.booksService.findByCategory(categoryId);
  }

  @Get('by-author/:authorId')
  @ApiOkResponse({ description: 'Books by author', type: [Book] })
  findByAuthor(@Param('authorId') authorId: string): Promise<Book[]> {
    return this.booksService.findByAuthor(authorId);
  }

  @Get(':id')
  @ApiOkResponse({ description: 'Book by ID', type: Book })
  findOne(@Param('id') id: string): Promise<Book> {
    return this.booksService.findOne(id);
  }

  @Patch(':id')
  @ApiOkResponse({ description: 'Book updated', type: Book })
  update(
    @Param('id') id: string,
    @Body() updateBookDto: UpdateBookDto,
  ): Promise<Book> {
    return this.booksService.update(id, updateBookDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@Param('id') id: string): Promise<void> {
    return this.booksService.remove(id);
  }

  @Patch(':id/stock')
  @ApiOkResponse({ description: 'Stock updated', type: Book })
  updateStock(
    @Param('id') id: string,
    @Query('quantity') quantity: number,
  ): Promise<Book> {
    return this.booksService.updateStock(id, quantity);
  }
}
