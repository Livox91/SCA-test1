import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { databaseConfig } from './config/database.config';
import { AuthorsModule } from './modules/authors/authors.module';
import { CategoriesModule } from './modules/categories/categories.module';
import { BooksModule } from './modules/books/books.module';
import { OrdersModule } from './modules/orders/orders.module';
import { StatisticsModule } from './modules/statistics/statistics.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(databaseConfig),
    AuthorsModule,
    CategoriesModule,
    BooksModule,
    OrdersModule,
    StatisticsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
