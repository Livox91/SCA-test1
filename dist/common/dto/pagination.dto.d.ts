export declare class PaginationDto {
    page?: number;
    limit?: number;
}
export declare class SearchBooksDto extends PaginationDto {
    search?: string;
    category?: string;
    author?: string;
    sortBy?: 'price' | 'createdAt' | 'rating' | 'title';
    sortOrder?: 'ASC' | 'DESC';
}
export declare class PaginationService {
    calculatePagination(page: number, limit: number): {
        skip: number;
        take: number;
    };
    buildPaginationMeta(page: number, limit: number, total: number): {
        page: number;
        limit: number;
        total: number;
        totalPages: number;
        hasNextPage: boolean;
        hasPreviousPage: boolean;
    };
}
