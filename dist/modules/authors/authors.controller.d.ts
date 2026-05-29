import { AuthorsService } from './authors.service';
import { Author } from './entities/author.entity';
import { CreateAuthorDto, UpdateAuthorDto } from './dto/create-author.dto';
export declare class AuthorsController {
    private readonly authorsService;
    constructor(authorsService: AuthorsService);
    create(createAuthorDto: CreateAuthorDto): Promise<Author>;
    findAll(): Promise<Author[]>;
    findOne(id: string): Promise<Author>;
    update(id: string, updateAuthorDto: UpdateAuthorDto): Promise<Author>;
    remove(id: string): Promise<void>;
}
