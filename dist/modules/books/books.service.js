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
exports.BooksService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const book_entity_1 = require("./entities/book.entity");
const author_entity_1 = require("../authors/entities/author.entity");
const category_entity_1 = require("../categories/entities/category.entity");
let BooksService = class BooksService {
    bookRepository;
    authorRepository;
    categoryRepository;
    constructor(bookRepository, authorRepository, categoryRepository) {
        this.bookRepository = bookRepository;
        this.authorRepository = authorRepository;
        this.categoryRepository = categoryRepository;
    }
    async create(createBookDto) {
        const author = await this.authorRepository.findOne({
            where: { id: createBookDto.authorId },
        });
        if (!author) {
            throw new common_1.BadRequestException('Author not found');
        }
        const category = await this.categoryRepository.findOne({
            where: { id: createBookDto.categoryId },
        });
        if (!category) {
            throw new common_1.BadRequestException('Category not found');
        }
        const book = this.bookRepository.create({
            ...createBookDto,
            author,
            category,
        });
        return this.bookRepository.save(book);
    }
    async findAll() {
        return this.bookRepository.find({
            relations: { author: true, category: true },
            order: { createdAt: 'DESC' },
        });
    }
    async findOne(id) {
        const book = await this.bookRepository.findOne({
            where: { id },
            relations: { author: true, category: true },
        });
        if (!book) {
            throw new common_1.NotFoundException(`Book with ID ${id} not found`);
        }
        return book;
    }
    async findByCategory(categoryId) {
        const category = await this.categoryRepository.findOne({
            where: { id: categoryId },
        });
        if (!category) {
            throw new common_1.NotFoundException(`Category with ID ${categoryId} not found`);
        }
        return this.bookRepository.find({
            where: { categoryId },
            relations: { author: true, category: true },
        });
    }
    async findByAuthor(authorId) {
        const author = await this.authorRepository.findOne({
            where: { id: authorId },
        });
        if (!author) {
            throw new common_1.NotFoundException(`Author with ID ${authorId} not found`);
        }
        return this.bookRepository.find({
            where: { authorId },
            relations: { author: true, category: true },
        });
    }
    async update(id, updateBookDto) {
        const book = await this.findOne(id);
        if (updateBookDto.authorId && updateBookDto.authorId !== book.authorId) {
            const author = await this.authorRepository.findOne({
                where: { id: updateBookDto.authorId },
            });
            if (!author) {
                throw new common_1.BadRequestException('Author not found');
            }
            book.author = author;
        }
        if (updateBookDto.categoryId && updateBookDto.categoryId !== book.categoryId) {
            const category = await this.categoryRepository.findOne({
                where: { id: updateBookDto.categoryId },
            });
            if (!category) {
                throw new common_1.BadRequestException('Category not found');
            }
            book.category = category;
        }
        Object.assign(book, updateBookDto);
        return this.bookRepository.save(book);
    }
    async remove(id) {
        const book = await this.findOne(id);
        await this.bookRepository.remove(book);
    }
    async updateStock(id, quantity) {
        const book = await this.findOne(id);
        if (book.stockQuantity + quantity < 0) {
            throw new common_1.BadRequestException('Insufficient stock');
        }
        book.stockQuantity += quantity;
        return this.bookRepository.save(book);
    }
    async searchBooks(searchDto) {
        const { page = 1, limit = 10, search, category, author, sortBy = 'createdAt', sortOrder = 'DESC' } = searchDto;
        const skip = (page - 1) * limit;
        const query = this.bookRepository.createQueryBuilder('book')
            .leftJoinAndSelect('book.author', 'author')
            .leftJoinAndSelect('book.category', 'categoryEntity');
        if (search) {
            query.andWhere('(book.title ILIKE :search OR book.description ILIKE :search OR author.name ILIKE :search)', { search: `%${search}%` });
        }
        if (category) {
            query.andWhere('categoryEntity.id = :categoryId', { categoryId: category });
        }
        if (author) {
            query.andWhere('author.id = :authorId', { authorId: author });
        }
        query.orderBy(`book.${sortBy}`, sortOrder);
        query.skip(skip).take(limit);
        const [data, total] = await query.getManyAndCount();
        const meta = {
            page,
            limit,
            total,
            totalPages: Math.ceil(total / limit),
            hasNextPage: page * limit < total,
            hasPreviousPage: page > 1,
        };
        return { data, meta };
    }
};
exports.BooksService = BooksService;
exports.BooksService = BooksService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(book_entity_1.Book)),
    __param(1, (0, typeorm_1.InjectRepository)(author_entity_1.Author)),
    __param(2, (0, typeorm_1.InjectRepository)(category_entity_1.Category)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository])
], BooksService);
//# sourceMappingURL=books.service.js.map