import { Controller, Get, Post, Body, Patch, Param, Delete, HttpCode, HttpStatus, Query } from '@nestjs/common';
import { ApiTags, ApiCreatedResponse, ApiOkResponse } from '@nestjs/swagger';
import { OrdersService } from './orders.service';
import { Order, OrderStatus } from './entities/order.entity';
import { CreateOrderDto, UpdateOrderDto } from './dto/create-order.dto';

@ApiTags('orders')
@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Post()
  @ApiCreatedResponse({ description: 'Order created successfully', type: Order })
  create(@Body() createOrderDto: CreateOrderDto): Promise<Order> {
    return this.ordersService.create(createOrderDto);
  }

  @Get()
  @ApiOkResponse({ description: 'All orders', type: [Order] })
  findAll(): Promise<Order[]> {
    return this.ordersService.findAll();
  }

  @Get('by-status/:status')
  @ApiOkResponse({ description: 'Orders by status', type: [Order] })
  findByStatus(@Param('status') status: OrderStatus): Promise<Order[]> {
    return this.ordersService.findByStatus(status);
  }

  @Get('by-customer/:email')
  @ApiOkResponse({ description: 'Orders by customer email', type: [Order] })
  findByCustomerEmail(@Param('email') email: string): Promise<Order[]> {
    return this.ordersService.findByCustomerEmail(email);
  }

  @Get(':id')
  @ApiOkResponse({ description: 'Order by ID', type: Order })
  findOne(@Param('id') id: string): Promise<Order> {
    return this.ordersService.findOne(id);
  }

  @Patch(':id')
  @ApiOkResponse({ description: 'Order updated', type: Order })
  update(
    @Param('id') id: string,
    @Body() updateOrderDto: UpdateOrderDto,
  ): Promise<Order> {
    return this.ordersService.update(id, updateOrderDto);
  }

  @Patch(':id/status')
  @ApiOkResponse({ description: 'Order status updated', type: Order })
  updateStatus(
    @Param('id') id: string,
    @Body('status') status: OrderStatus,
  ): Promise<Order> {
    return this.ordersService.updateStatus(id, status);
  }

  @Patch(':id/cancel')
  @ApiOkResponse({ description: 'Order cancelled', type: Order })
  cancel(@Param('id') id: string): Promise<Order> {
    return this.ordersService.cancel(id);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@Param('id') id: string): Promise<void> {
    return this.ordersService.remove(id);
  }
}
