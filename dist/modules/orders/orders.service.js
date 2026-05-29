"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrdersService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const order_entity_1 = require("./entities/order.entity");
const order_item_entity_1 = require("./entities/order-item.entity");
const book_entity_1 = require("../books/entities/book.entity");
const uuid_1 = require("uuid");
let OrdersService = class OrdersService {
    orderRepository;
    orderItemRepository;
    bookRepository;
    constructor(orderRepository, orderItemRepository, bookRepository) {
        this.orderRepository = orderRepository;
        this.orderItemRepository = orderItemRepository;
        this.bookRepository = bookRepository;
    }
    async create(createOrderDto) {
        const orderNumber = `ORD-${Date.now()}-${(0, uuid_1.v4)().substring(0, 8)}`;
        let totalAmount = 0;
        const orderItems = [];
        for (const item of createOrderDto.items) {
            const book = await this.bookRepository.findOne({
                where: { id: item.bookId },
            });
            if (!book) {
                throw new common_1.BadRequestException(`Book with ID ${item.bookId} not found`);
            }
            if (book.stockQuantity < item.quantity) {
                throw new common_1.BadRequestException(`Insufficient stock for book: ${book.title}. Available: ${book.stockQuantity}`);
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
    async findAll() {
        return this.orderRepository.find({
            relations: { items: { book: true } },
            order: { createdAt: 'DESC' },
        });
    }
    async findOne(id) {
        const order = await this.orderRepository.findOne({
            where: { id },
            relations: { items: { book: true } },
        });
        if (!order) {
            throw new common_1.NotFoundException(`Order with ID ${id} not found`);
        }
        return order;
    }
    async findByStatus(status) {
        return this.orderRepository.find({
            where: { status },
            relations: { items: { book: true } },
            order: { createdAt: 'DESC' },
        });
    }
    async findByCustomerEmail(email) {
        return this.orderRepository.find({
            where: { customerEmail: email },
            relations: { items: { book: true } },
            order: { createdAt: 'DESC' },
        });
    }
    async update(id, updateOrderDto) {
        const order = await this.findOne(id);
        Object.assign(order, updateOrderDto);
        return this.orderRepository.save(order);
    }
    async updateStatus(id, status) {
        const order = await this.findOne(id);
        order.status = status;
        return this.orderRepository.save(order);
    }
    async cancel(id) {
        const order = await this.findOne(id);
        if (order.status === order_entity_1.OrderStatus.CANCELLED) {
            throw new common_1.BadRequestException('Order is already cancelled');
        }
        if (order.status === order_entity_1.OrderStatus.DELIVERED) {
            throw new common_1.BadRequestException('Cannot cancel a delivered order');
        }
        for (const item of order.items) {
            const book = await this.bookRepository.findOne({
                where: { id: item.bookId },
            });
            if (book) {
                book.stockQuantity += item.quantity;
                await this.bookRepository.save(book);
            }
        }
        order.status = order_entity_1.OrderStatus.CANCELLED;
        return this.orderRepository.save(order);
    }
    async remove(id) {
        const order = await this.findOne(id);
        await this.orderRepository.remove(order);
    }
};
exports.OrdersService = OrdersService;
exports.OrdersService = OrdersService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(order_entity_1.Order)),
    __param(1, (0, typeorm_1.InjectRepository)(order_item_entity_1.OrderItem)),
    __param(2, (0, typeorm_1.InjectRepository)(book_entity_1.Book)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository])
], OrdersService);
//# sourceMappingURL=orders.service.js.map