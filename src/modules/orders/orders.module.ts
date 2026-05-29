import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Order } from './entities/order.entity';
import { OrderItem } from './entities/order-item.entity';
import { OrdersService } from './orders.service';
import { OrdersController } from './orders.controller';
import { BooksModule } from '../books/books.module';
import { Book } from '../books/entities/book.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Order, OrderItem, Book]),
    BooksModule,
  ],
  controllers: [OrdersController],
  providers: [OrdersService],
  exports: [OrdersService],
})
export class OrdersModule {}
