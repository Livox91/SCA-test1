import { Book } from '../../books/entities/book.entity';
export declare class Author {
    id: string;
    name: string;
    biography: string;
    email: string;
    phone: string;
    country: string;
    createdAt: Date;
    updatedAt: Date;
    books: Book[];
}
