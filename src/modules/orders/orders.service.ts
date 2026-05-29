import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Order, OrderStatus } from './entities/order.entity';
import { OrderItem } from './entities/order-item.entity';
import { CreateOrderDto, UpdateOrderDto } from './dto/create-order.dto';
import { Book } from '../books/entities/book.entity';
import { v4 as uuid } from 'uuid';

@Injectable()
export class OrdersService {
  constructor(
    @InjectRepository(Order)
    private readonly orderRepository: Repository<Order>,
    @InjectRepository(OrderItem)
    private readonly orderItemRepository: Repository<OrderItem>,
    @InjectRepository(Book)
    private readonly bookRepository: Repository<Book>,
  ) {}

  async create(createOrderDto: CreateOrderDto): Promise<Order> {
    const orderNumber = `ORD-${Date.now()}-${uuid().substring(0, 8)}`;

    let totalAmount = 0;
    const orderItems: OrderItem[] = [];

    for (const item of createOrderDto.items) {
      const book = await this.bookRepository.findOne({
        where: { id: item.bookId },
      });

      if (!book) {
        throw new BadRequestException(`Book with ID ${item.bookId} not found`);
      }

      if (book.stockQuantity < item.quantity) {
        throw new BadRequestException(
          `Insufficient stock for book: ${book.title}. Available: ${book.stockQuantity}`,
        );
      }

      const subtotal = book.price * item.quantity;
      totalAmount += subtotal;

      const orderItem = this.orderItemRepository.create({
        quantity: item.quantity,
        priceAtPurchase: book.price,
        subtotal,
        book,
      });

      orderItems.push(orderItem);

      // Update book stock
      book.stockQuantity -= item.quantity;
      await this.bookRepository.save(book);
    }

    const order = this.orderRepository.create({
      orderNumber,
      customerName: createOrderDto.customerName,
      customerEmail: createOrderDto.customerEmail,
      shippingAddress: createOrderDto.shippingAddress,
      phoneNumber: createOrderDto.phoneNumber,
      totalAmount,
      notes: createOrderDto.notes,
      items: orderItems,
    });

    return this.orderRepository.save(order);
  }

  async findAll(): Promise<Order[]> {
    return this.orderRepository.find({
      relations: { items: { book: true } },
      order: { createdAt: 'DESC' },
    });
  }

  async findOne(id: string): Promise<Order> {
    const order = await this.orderRepository.findOne({
      where: { id },
      relations: { items: { book: true } },
    });

    if (!order) {
      throw new NotFoundException(`Order with ID ${id} not found`);
    }

    return order;
  }

  async findByStatus(status: OrderStatus): Promise<Order[]> {
    return this.orderRepository.find({
      where: { status },
      relations: { items: { book: true } },
      order: { createdAt: 'DESC' },
    });
  }

  async findByCustomerEmail(email: string): Promise<Order[]> {
    return this.orderRepository.find({
      where: { customerEmail: email },
      relations: { items: { book: true } },
      order: { createdAt: 'DESC' },
    });
  }

  async update(id: string, updateOrderDto: UpdateOrderDto): Promise<Order> {
    const order = await this.findOne(id);

    Object.assign(order, updateOrderDto);
    return this.orderRepository.save(order);
  }

  async updateStatus(id: string, status: OrderStatus): Promise<Order> {
    const order = await this.findOne(id);
    order.status = status;
    return this.orderRepository.save(order);
  }

  async cancel(id: string): Promise<Order> {
    const order = await this.findOne(id);

    if (order.status === OrderStatus.CANCELLED) {
      throw new BadRequestException('Order is already cancelled');
    }

    if (order.status === OrderStatus.DELIVERED) {
      throw new BadRequestException('Cannot cancel a delivered order');
    }

    // Restore stock
    for (const item of order.items) {
      const book = await this.bookRepository.findOne({
        where: { id: item.bookId },
      });

      if (book) {
        book.stockQuantity += item.quantity;
        await this.bookRepository.save(book);
      }
    }

    order.status = OrderStatus.CANCELLED;
    return this.orderRepository.save(order);
  }

  async remove(id: string): Promise<void> {
    const order = await this.findOne(id);
    await this.orderRepository.remove(order);
  }
}
