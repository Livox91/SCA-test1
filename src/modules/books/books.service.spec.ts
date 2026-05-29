import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { BooksService } from './books.service';
import { Book } from './entities/book.entity';
import { Author } from '../authors/entities/author.entity';
import { Category } from '../categories/entities/category.entity';
import { NotFoundException, BadRequestException } from '@nestjs/common';

describe('BooksService', () => {
  let service: BooksService;
  let mockBookRepository: any;
  let mockAuthorRepository: any;
  let mockCategoryRepository: any;

  beforeEach(async () => {
    mockBookRepository = {
      find: jest.fn(),
      findOne: jest.fn(),
      create: jest.fn(),
      save: jest.fn(),
      createQueryBuilder: jest.fn(),
    };

    mockAuthorRepository = {
      findOne: jest.fn(),
    };

    mockCategoryRepository = {
      findOne: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        BooksService,
        {
          provide: getRepositoryToken(Book),
          useValue: mockBookRepository,
        },
        {
          provide: getRepositoryToken(Author),
          useValue: mockAuthorRepository,
        },
        {
          provide: getRepositoryToken(Category),
          useValue: mockCategoryRepository,
        },
      ],
    }).compile();

    service = module.get<BooksService>(BooksService);
  });

  describe('findOne', () => {
    it('should return a book by id', async () => {
      const book = { id: '1', title: 'Test Book' };
      mockBookRepository.findOne.mockResolvedValue(book);

      const result = await service.findOne('1');

      expect(result).toEqual(book);
      expect(mockBookRepository.findOne).toHaveBeenCalledWith({
        where: { id: '1' },
        relations: { author: true, category: true },
      });
    });

    it('should throw NotFoundException when book not found', async () => {
      mockBookRepository.findOne.mockResolvedValue(null);

      await expect(service.findOne('invalid')).rejects.toThrow(NotFoundException);
    });
  });

  describe('findAll', () => {
    it('should return all books', async () => {
      const books = [{ id: '1', title: 'Book 1' }];
      mockBookRepository.find.mockResolvedValue(books);

      const result = await service.findAll();

      expect(result).toEqual(books);
      expect(mockBookRepository.find).toHaveBeenCalled();
    });
  });

  describe('updateStock', () => {
    it('should update book stock', async () => {
      const book = { id: '1', stockQuantity: 10 };
      mockBookRepository.findOne.mockResolvedValue(book);
      mockBookRepository.save.mockResolvedValue({ ...book, stockQuantity: 12 });

      const result = await service.updateStock('1', 2);

      expect(result.stockQuantity).toBe(12);
      expect(mockBookRepository.save).toHaveBeenCalled();
    });

    it('should throw BadRequestException when stock goes negative', async () => {
      const book = { id: '1', stockQuantity: 5 };
      mockBookRepository.findOne.mockResolvedValue(book);

      await expect(service.updateStock('1', -10)).rejects.toThrow(BadRequestException);
    });
  });
});
