import { OrderItem } from './order-item.entity';
export declare enum OrderStatus {
    PENDING = "pending",
    CONFIRMED = "confirmed",
    SHIPPED = "shipped",
    DELIVERED = "delivered",
    CANCELLED = "cancelled"
}
export declare class Order {
    id: string;
    orderNumber: string;
    customerName: string;
    customerEmail: string;
    shippingAddress: string;
    phoneNumber: string;
    totalAmount: number;
    status: OrderStatus;
    notes: string;
    trackingNumber: string;
    createdAt: Date;
    updatedAt: Date;
    items: OrderItem[];
}
