import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Author } from './entities/author.entity';
import { CreateAuthorDto, UpdateAuthorDto } from './dto/create-author.dto';

@Injectable()
export class AuthorsService {
  constructor(
    @InjectRepository(Author)
    private readonly authorRepository: Repository<Author>,
  ) {}

  async create(createAuthorDto: CreateAuthorDto): Promise<Author> {
    const existingAuthor = await this.authorRepository.findOne({
      where: { name: createAuthorDto.name },
    });

    if (existingAuthor) {
      throw new ConflictException('Author with this name already exists');
    }

    const author = this.authorRepository.create(createAuthorDto);
    return this.authorRepository.save(author);
  }

  async findAll(): Promise<Author[]> {
    return this.authorRepository.find({
      relations: { books: true },
      order: { createdAt: 'DESC' },
    });
  }

  async findOne(id: string): Promise<Author> {
    const author = await this.authorRepository.findOne({
      where: { id },
      relations: { books: true },
    });

    if (!author) {
      throw new NotFoundException(`Author with ID ${id} not found`);
    }

    return author;
  }

  async update(id: string, updateAuthorDto: UpdateAuthorDto): Promise<Author> {
    const author = await this.findOne(id);

    if (updateAuthorDto.name && updateAuthorDto.name !== author.name) {
      const existingAuthor = await this.authorRepository.findOne({
        where: { name: updateAuthorDto.name },
      });

      if (existingAuthor) {
        throw new ConflictException('Author with this name already exists');
      }
    }

    Object.assign(author, updateAuthorDto);
    return this.authorRepository.save(author);
  }

  async remove(id: string): Promise<void> {
    const author = await this.findOne(id);
    await this.authorRepository.remove(author);
  }
}
