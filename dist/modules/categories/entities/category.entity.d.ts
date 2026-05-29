import { Book } from '../../books/entities/book.entity';
export declare class Category {
    id: string;
    name: string;
    description: string;
    icon: string;
    createdAt: Date;
    updatedAt: Date;
    books: Book[];
}
