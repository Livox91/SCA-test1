import { BooksService } from './books.service';
import { Book } from './entities/book.entity';
import { CreateBookDto, UpdateBookDto } from './dto/create-book.dto';
export declare class BooksController {
    private readonly booksService;
    constructor(booksService: BooksService);
    create(createBookDto: CreateBookDto): Promise<Book>;
    findAll(): Promise<Book[]>;
    findByCategory(categoryId: string): Promise<Book[]>;
    findByAuthor(authorId: string): Promise<Book[]>;
    findOne(id: string): Promise<Book>;
    update(id: string, updateBookDto: UpdateBookDto): Promise<Book>;
    remove(id: string): Promise<void>;
    updateStock(id: string, quantity: number): Promise<Book>;
}
