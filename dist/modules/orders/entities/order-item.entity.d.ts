import { Order } from './order.entity';
import { Book } from '../../books/entities/book.entity';
export declare class OrderItem {
    id: string;
    quantity: number;
    priceAtPurchase: number;
    subtotal: number;
    order: Order;
    orderId: string;
    book: Book;
    bookId: string;
}
