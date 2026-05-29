import { Repository } from 'typeorm';
import { Author } from './entities/author.entity';
import { CreateAuthorDto, UpdateAuthorDto } from './dto/create-author.dto';
export declare class AuthorsService {
    private readonly authorRepository;
    constructor(authorRepository: Repository<Author>);
    create(createAuthorDto: CreateAuthorDto): Promise<Author>;
    findAll(): Promise<Author[]>;
    findOne(id: string): Promise<Author>;
    update(id: string, updateAuthorDto: UpdateAuthorDto): Promise<Author>;
    remove(id: string): Promise<void>;
}
