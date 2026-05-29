import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Order } from './order.entity';
import { Book } from '../../books/entities/book.entity';

@Entity('order_items')
export class OrderItem {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'int' })
  quantity: number;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  priceAtPurchase: number;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  subtotal: number;

  @ManyToOne(() => Order, (order) => order.items, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'orderId' })
  order: Order;

  @Column({ type: 'varchar' })
  orderId: string;

  @ManyToOne(() => Book, (book) => book.orderItems, { onDelete: 'SET NULL', nullable: true })
  @JoinColumn({ name: 'bookId' })
  book: Book;

  @Column({ type: 'varchar', nullable: true })
  bookId: string;
}
