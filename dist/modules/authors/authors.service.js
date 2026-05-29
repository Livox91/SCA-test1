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
exports.AuthorsService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const author_entity_1 = require("./entities/author.entity");
let AuthorsService = class AuthorsService {
    authorRepository;
    constructor(authorRepository) {
        this.authorRepository = authorRepository;
    }
    async create(createAuthorDto) {
        const existingAuthor = await this.authorRepository.findOne({
            where: { name: createAuthorDto.name },
        });
        if (existingAuthor) {
            throw new common_1.ConflictException('Author with this name already exists');
        }
        const author = this.authorRepository.create(createAuthorDto);
        return this.authorRepository.save(author);
    }
    async findAll() {
        return this.authorRepository.find({
            relations: { books: true },
            order: { createdAt: 'DESC' },
        });
    }
    async findOne(id) {
        const author = await this.authorRepository.findOne({
            where: { id },
            relations: { books: true },
        });
        if (!author) {
            throw new common_1.NotFoundException(`Author with ID ${id} not found`);
        }
        return author;
    }
    async update(id, updateAuthorDto) {
        const author = await this.findOne(id);
        if (updateAuthorDto.name && updateAuthorDto.name !== author.name) {
            const existingAuthor = await this.authorRepository.findOne({
                where: { name: updateAuthorDto.name },
            });
            if (existingAuthor) {
                throw new common_1.ConflictException('Author with this name already exists');
            }
        }
        Object.assign(author, updateAuthorDto);
        return this.authorRepository.save(author);
    }
    async remove(id) {
        const author = await this.findOne(id);
        await this.authorRepository.remove(author);
    }
};
exports.AuthorsService = AuthorsService;
exports.AuthorsService = AuthorsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(author_entity_1.Author)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], AuthorsService);
//# sourceMappingURL=authors.service.js.map