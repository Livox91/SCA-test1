import { Author } from '../../authors/entities/author.entity';
import { Category } from '../../categories/entities/category.entity';
import { OrderItem } from '../../orders/entities/order-item.entity';
export declare class Book {
    id: string;
    title: string;
    description: string;
    isbn: string;
    price: number;
    stockQuantity: number;
    pages: number;
    language: string;
    publishedDate: Date;
    publisher: string;
    rating: number;
    reviewCount: number;
    createdAt: Date;
    updatedAt: Date;
    author: Author;
    authorId: string;
    category: Category;
    categoryId: string;
    orderItems: OrderItem[];
}
