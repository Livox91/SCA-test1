import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { Book } from '../modules/books/entities/book.entity';
import { Author } from '../modules/authors/entities/author.entity';
import { Category } from '../modules/categories/entities/category.entity';
import { Order } from '../modules/orders/entities/order.entity';
import { OrderItem } from '../modules/orders/entities/order-item.entity';
import { Review } from '../modules/reviews/entities/review.entity';

export const databaseConfig: TypeOrmModuleOptions = {
  type: 'better-sqlite3',
  database: 'bookstore.db',
  entities: [Book, Author, Category, Order, OrderItem, Review],
  synchronize: true,
  logging: process.env.NODE_ENV !== 'production',
} as any;
