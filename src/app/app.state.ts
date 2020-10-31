import { Book } from './models/book.model';
import { Author } from './models/author.model';

export interface AppState {
 books: Book[],
 authors: Author[]
}