import { OrdersService } from './orders.service';
import { Order, OrderStatus } from './entities/order.entity';
import { CreateOrderDto, UpdateOrderDto } from './dto/create-order.dto';
export declare class OrdersController {
    private readonly ordersService;
    constructor(ordersService: OrdersService);
    create(createOrderDto: CreateOrderDto): Promise<Order>;
    findAll(): Promise<Order[]>;
    findByStatus(status: OrderStatus): Promise<Order[]>;
    findByCustomerEmail(email: string): Promise<Order[]>;
    findOne(id: string): Promise<Order>;
    update(id: string, updateOrderDto: UpdateOrderDto): Promise<Order>;
    updateStatus(id: string, status: OrderStatus): Promise<Order>;
    cancel(id: string): Promise<Order>;
    remove(id: string): Promise<void>;
}
