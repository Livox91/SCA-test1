"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.databaseConfig = void 0;
const book_entity_1 = require("../modules/books/entities/book.entity");
const author_entity_1 = require("../modules/authors/entities/author.entity");
const category_entity_1 = require("../modules/categories/entities/category.entity");
const order_entity_1 = require("../modules/orders/entities/order.entity");
const order_item_entity_1 = require("../modules/orders/entities/order-item.entity");
const review_entity_1 = require("../modules/reviews/entities/review.entity");
exports.databaseConfig = {
    type: 'better-sqlite3',
    database: 'bookstore.db',
    entities: [book_entity_1.Book, author_entity_1.Author, category_entity_1.Category, order_entity_1.Order, order_item_entity_1.OrderItem, review_entity_1.Review],
    synchronize: true,
    logging: process.env.NODE_ENV !== 'production',
};
//# sourceMappingURL=database.config.js.map