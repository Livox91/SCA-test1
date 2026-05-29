"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("../app.module");
const authors_service_1 = require("../modules/authors/authors.service");
const categories_service_1 = require("../modules/categories/categories.service");
const books_service_1 = require("../modules/books/books.service");
async function seedDatabase() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    const authorsService = app.get(authors_service_1.AuthorsService);
    const categoriesService = app.get(categories_service_1.CategoriesService);
    const booksService = app.get(books_service_1.BooksService);
    console.log('🌱 Starting database seed...\n');
    try {
        console.log('📚 Creating categories...');
        const fiction = await categoriesService.create({
            name: 'Fiction',
            description: 'Fictional stories and novels',
            icon: '📖',
        });
        const scifi = await categoriesService.create({
            name: 'Science Fiction',
            description: 'Science fiction novels and stories',
            icon: '🚀',
        });
        const mystery = await categoriesService.create({
            name: 'Mystery',
            description: 'Mystery and thriller novels',
            icon: '🔍',
        });
        const romance = await categoriesService.create({
            name: 'Romance',
            description: 'Romance and love stories',
            icon: '💕',
        });
        console.log('✅ Categories created\n');
        console.log('✍️  Creating authors...');
        const author1 = await authorsService.create({
            name: 'J.K. Rowling',
            biography: 'British author, best known for Harry Potter series',
            email: 'jk.rowling@example.com',
            country: 'United Kingdom',
        });
        const author2 = await authorsService.create({
            name: 'Isaac Asimov',
            biography: 'American writer and professor of biochemistry',
            email: 'isaac.asimov@example.com',
            country: 'United States',
        });
        const author3 = await authorsService.create({
            name: 'Agatha Christie',
            biography: 'British crime novelist known for detective stories',
            email: 'agatha.christie@example.com',
            country: 'United Kingdom',
        });
        const author4 = await authorsService.create({
            name: 'Nora Roberts',
            biography: 'American romance novelist',
            email: 'nora.roberts@example.com',
            country: 'United States',
        });
        console.log('✅ Authors created\n');
        console.log('📚 Creating books...');
        await booksService.create({
            title: 'Harry Potter and the Philosopher\'s Stone',
            description: 'The first novel in the Harry Potter series',
            isbn: '978-0747532699',
            price: 9.99,
            stockQuantity: 50,
            pages: 223,
            language: 'English',
            publishedDate: '1997-06-26',
            publisher: 'Bloomsbury',
            authorId: author1.id,
            categoryId: fiction.id,
        });
        await booksService.create({
            title: 'Foundation',
            description: 'The first novel in the Foundation series',
            isbn: '978-0553293357',
            price: 14.99,
            stockQuantity: 30,
            pages: 255,
            language: 'English',
            publishedDate: '1951-06-01',
            publisher: 'Gnome Press',
            authorId: author2.id,
            categoryId: scifi.id,
        });
        await booksService.create({
            title: 'Murder on the Orient Express',
            description: 'Hercule Poirot mystery novel',
            isbn: '978-0062693556',
            price: 12.99,
            stockQuantity: 35,
            pages: 256,
            language: 'English',
            publishedDate: '1934-01-01',
            publisher: 'Collins',
            authorId: author3.id,
            categoryId: mystery.id,
        });
        await booksService.create({
            title: 'The Witness',
            description: 'A romantic suspense novel',
            isbn: '978-0399176609',
            price: 11.99,
            stockQuantity: 25,
            pages: 400,
            language: 'English',
            publishedDate: '2014-11-04',
            publisher: 'Putnam',
            authorId: author4.id,
            categoryId: romance.id,
        });
        console.log('✅ Books created\n');
        console.log('🎉 Database seed completed successfully!\n');
    }
    catch (error) {
        console.error('❌ Error seeding database:', error.message);
    }
    finally {
        await app.close();
    }
}
seedDatabase();
//# sourceMappingURL=seed.js.map