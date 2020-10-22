import { Book } from './models/book.model';
import { BooksState } from './reducers/book.reducer';

export interface AppState {
 books: Book[]
}