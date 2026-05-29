import { Repository } from 'typeorm';
import { Book } from './entities/book.entity';
import { CreateBookDto, UpdateBookDto } from './dto/create-book.dto';
import { Author } from '../authors/entities/author.entity';
import { Category } from '../categories/entities/category.entity';
import { SearchBooksDto } from '../../common/dto/pagination.dto';
export declare class BooksService {
    private readonly bookRepository;
    private readonly authorRepository;
    private readonly categoryRepository;
    constructor(bookRepository: Repository<Book>, authorRepository: Repository<Author>, categoryRepository: Repository<Category>);
    create(createBookDto: CreateBookDto): Promise<Book>;
    findAll(): Promise<Book[]>;
    findOne(id: string): Promise<Book>;
    findByCategory(categoryId: string): Promise<Book[]>;
    findByAuthor(authorId: string): Promise<Book[]>;
    update(id: string, updateBookDto: UpdateBookDto): Promise<Book>;
    remove(id: string): Promise<void>;
    updateStock(id: string, quantity: number): Promise<Book>;
    searchBooks(searchDto: SearchBooksDto): Promise<{
        data: Book[];
        meta: any;
    }>;
}
