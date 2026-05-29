import { Repository } from 'typeorm';
import { Order, OrderStatus } from './entities/order.entity';
import { OrderItem } from './entities/order-item.entity';
import { CreateOrderDto, UpdateOrderDto } from './dto/create-order.dto';
import { Book } from '../books/entities/book.entity';
export declare class OrdersService {
    private readonly orderRepository;
    private readonly orderItemRepository;
    private readonly bookRepository;
    constructor(orderRepository: Repository<Order>, orderItemRepository: Repository<OrderItem>, bookRepository: Repository<Book>);
    create(createOrderDto: CreateOrderDto): Promise<Order>;
    findAll(): Promise<Order[]>;
    findOne(id: string): Promise<Order>;
    findByStatus(status: OrderStatus): Promise<Order[]>;
    findByCustomerEmail(email: string): Promise<Order[]>;
    update(id: string, updateOrderDto: UpdateOrderDto): Promise<Order>;
    updateStatus(id: string, status: OrderStatus): Promise<Order>;
    cancel(id: string): Promise<Order>;
    remove(id: string): Promise<void>;
}
