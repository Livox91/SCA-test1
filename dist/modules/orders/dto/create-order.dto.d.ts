import { OrderStatus } from '../entities/order.entity';
export declare class CreateOrderItemDto {
    bookId: string;
    quantity: number;
}
export declare class CreateOrderDto {
    customerName: string;
    customerEmail: string;
    shippingAddress: string;
    phoneNumber?: string;
    items: CreateOrderItemDto[];
    notes?: string;
}
export declare class UpdateOrderDto {
    customerName?: string;
    customerEmail?: string;
    shippingAddress?: string;
    phoneNumber?: string;
    status?: OrderStatus;
    notes?: string;
    trackingNumber?: string;
}
