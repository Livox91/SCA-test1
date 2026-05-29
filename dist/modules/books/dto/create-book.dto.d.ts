export declare class CreateBookDto {
    title: string;
    description?: string;
    isbn?: string;
    price: number;
    stockQuantity: number;
    pages?: number;
    language?: string;
    publishedDate?: string;
    publisher?: string;
    authorId: string;
    categoryId: string;
}
export declare class UpdateBookDto {
    title?: string;
    description?: string;
    isbn?: string;
    price?: number;
    stockQuantity?: number;
    pages?: number;
    language?: string;
    publishedDate?: string;
    publisher?: string;
    authorId?: string;
    categoryId?: string;
}
