import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Book } from '../books/entities/book.entity';
import { Order } from '../orders/entities/order.entity';
import { Author } from '../authors/entities/author.entity';
import { Category } from '../categories/entities/category.entity';

@Injectable()
export class StatisticsService {
  constructor(
    @InjectRepository(Book)
    private readonly bookRepository: Repository<Book>,
    @InjectRepository(Order)
    private readonly orderRepository: Repository<Order>,
    @InjectRepository(Author)
    private readonly authorRepository: Repository<Author>,
    @InjectRepository(Category)
    private readonly categoryRepository: Repository<Category>,
  ) {}

  async getOverview() {
    const [books, totalBooks] = await this.bookRepository.findAndCount();
    const [orders, totalOrders] = await this.orderRepository.findAndCount();
    const [authors] = await this.authorRepository.findAndCount();
    const [categories] = await this.categoryRepository.findAndCount();

    const totalStock = books.reduce((sum, book) => sum + book.stockQuantity, 0);
    const lowStockBooks = books.filter((book) => book.stockQuantity < 5).length;
    const totalRevenue = orders.reduce((sum, order) => sum + Number(order.totalAmount), 0);

    return {
      books: {
        total: totalBooks,
        lowStock: lowStockBooks,
        totalStock,
      },
      orders: {
        total: totalOrders,
        totalRevenue: parseFloat(totalRevenue.toFixed(2)),
        averageOrderValue: totalOrders > 0 ? parseFloat((totalRevenue / totalOrders).toFixed(2)) : 0,
      },
      authors: {
        total: authors,
      },
      categories: {
        total: categories,
      },
    };
  }

  async getTopBooks(limit: number = 10) {
    return this.bookRepository.find({
      relations: { author: true, category: true },
      order: { reviewCount: 'DESC', rating: 'DESC' },
      take: limit,
    });
  }

  async getMostSoldBooks(limit: number = 10) {
    const orders = await this.orderRepository.find({
      relations: { items: { book: true } },
    });

    const bookSales = new Map<string, { book: any; quantity: number }>();

    orders.forEach((order) => {
      order.items.forEach((item) => {
        if (item.book) {
          const existing = bookSales.get(item.book.id) || { book: item.book, quantity: 0 };
          existing.quantity += item.quantity;
          bookSales.set(item.book.id, existing);
        }
      });
    });

    return Array.from(bookSales.values())
      .sort((a, b) => b.quantity - a.quantity)
      .slice(0, limit)
      .map((item) => ({
        ...item.book,
        salesQuantity: item.quantity,
      }));
  }

  async getCategoryStats() {
    const categories = await this.categoryRepository.find({
      relations: { books: true },
    });

    return categories.map((category) => ({
      id: category.id,
      name: category.name,
      bookCount: category.books.length,
      totalValue: category.books.reduce((sum, book) => sum + Number(book.price) * book.stockQuantity, 0),
    }));
  }

  async getAuthorStats() {
    const authors = await this.authorRepository.find({
      relations: { books: true },
    });

    return authors.map((author) => ({
      id: author.id,
      name: author.name,
      bookCount: author.books.length,
      totalValue: author.books.reduce((sum, book) => sum + Number(book.price) * book.stockQuantity, 0),
    }));
  }
}
