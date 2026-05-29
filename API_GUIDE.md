# 📚 Bookstore Management API

A comprehensive NestJS REST API for managing a bookstore system with authors, categories, books, and orders.

## ✨ Features

- 📖 **Book Management**: Create, read, update, delete books with detailed information
- ✍️ **Author Management**: Manage book authors with biography and contact info
- 🏷️ **Category Management**: Organize books by categories
- 📦 **Order Management**: Handle customer orders with inventory management
- 🔍 **Advanced Search**: Full-text search with pagination and sorting
- 📊 **Stock Management**: Real-time inventory tracking
- 🛡️ **Error Handling**: Comprehensive error handling and logging
- 📚 **API Documentation**: Interactive Swagger/OpenAPI documentation
- ✅ **Data Validation**: Built-in validation using class-validator

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ installed
- npm or yarn package manager
- SQLite3 (for database)

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd bookstore-api
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Setup environment variables**
   ```bash
   # Copy .env file (already included)
   cp .env .env.local
   ```

4. **Start the application**
   ```bash
   npm run start
   ```

   The API will be available at `http://localhost:3000`

5. **Seed the database** (Optional)
   ```bash
   npm run seed
   ```

## 📝 Available Commands

```bash
# Development
npm run start          # Start the server
npm run start:dev      # Start with hot reload
npm run start:debug    # Start with debugging

# Production
npm run build          # Build the application
npm run start:prod     # Start production build

# Testing
npm run test           # Run tests
npm run test:e2e       # Run end-to-end tests
npm run test:cov       # Run tests with coverage

# Database
npm run seed           # Seed database with sample data

# Linting
npm run lint           # Run ESLint
npm run format         # Format code with Prettier
```

## 🔌 API Endpoints

### Authors
- `GET /authors` - Get all authors
- `GET /authors/:id` - Get author by ID
- `POST /authors` - Create new author
- `PATCH /authors/:id` - Update author
- `DELETE /authors/:id` - Delete author

### Categories
- `GET /categories` - Get all categories
- `GET /categories/:id` - Get category by ID
- `POST /categories` - Create new category
- `PATCH /categories/:id` - Update category
- `DELETE /categories/:id` - Delete category

### Books
- `GET /books` - Get all books
- `GET /books/search` - Search books with filters
- `GET /books/by-category/:categoryId` - Get books by category
- `GET /books/by-author/:authorId` - Get books by author
- `GET /books/:id` - Get book by ID
- `POST /books` - Create new book
- `PATCH /books/:id` - Update book
- `PATCH /books/:id/stock?quantity=X` - Update stock
- `DELETE /books/:id` - Delete book

### Orders
- `GET /orders` - Get all orders
- `GET /orders/by-status/:status` - Get orders by status
- `GET /orders/by-customer/:email` - Get customer orders
- `GET /orders/:id` - Get order by ID
- `POST /orders` - Create new order
- `PATCH /orders/:id` - Update order
- `PATCH /orders/:id/status` - Update order status
- `PATCH /orders/:id/cancel` - Cancel order
- `DELETE /orders/:id` - Delete order

## 📊 Database Schema

### Tables
- **authors**: Store author information
- **categories**: Store book categories
- **books**: Store book details with references to authors and categories
- **orders**: Store customer orders
- **order_items**: Store individual items in orders

## 🔍 Search Query Examples

```bash
# Search by keyword
GET /books/search?search=Harry&page=1&limit=10

# Filter by category
GET /books/search?category=<categoryId>&page=1&limit=10

# Filter by author
GET /books/search?author=<authorId>&page=1&limit=10

# Sort by price ascending
GET /books/search?sortBy=price&sortOrder=ASC&page=1&limit=10

# Combined filters
GET /books/search?search=Potter&category=<id>&sortBy=rating&sortOrder=DESC&page=1&limit=5
```

## 📚 API Documentation

Once the server is running, visit:
- **Swagger UI**: http://localhost:3000/api/docs

## 🛠️ Technology Stack

- **Framework**: NestJS 10.x
- **Database**: TypeORM with SQLite/better-sqlite3
- **Validation**: class-validator & class-transformer
- **Documentation**: Swagger/OpenAPI
- **Language**: TypeScript
- **Testing**: Jest

## 📂 Project Structure

```
src/
├── common/              # Shared filters, interceptors, DTOs
│   ├── dto/            # Pagination and common DTOs
│   ├── filters/        # Exception filters
│   └── interceptors/   # HTTP interceptors
├── config/             # Configuration files
├── database/           # Database setup and seed scripts
├── modules/            # Feature modules
│   ├── authors/        # Author module
│   ├── categories/     # Category module
│   ├── books/          # Book module
│   └── orders/         # Order module
├── app.module.ts       # Root module
└── main.ts             # Application entry point
```

## 🔐 Error Handling

All endpoints return consistent error responses:

```json
{
  "statusCode": 400,
  "timestamp": "2026-05-30T10:30:00.000Z",
  "path": "/books",
  "method": "POST",
  "message": "Validation failed",
  "error": "Bad Request"
}
```

## 💾 Database Persistence

The application uses SQLite for data persistence. The database file (`bookstore.db`) is created automatically in the project root on first run.

To reset the database, delete `bookstore.db` and restart the application.

## 📦 Sample Data

The application includes a seed script that populates the database with sample data:
- 4 authors
- 4 categories  
- 4 books

Run `npm run seed` to populate the database.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit pull requests.

## 📄 License

This project is licensed under the MIT License.

## 📧 Support

For issues or questions, please open an issue in the repository.

---

**Built with ❤️ using NestJS**
