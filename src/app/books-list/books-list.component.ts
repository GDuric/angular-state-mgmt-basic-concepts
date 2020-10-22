import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Book } from './../models/book.model';
import { AppState } from '../app.state';
import { Observable } from 'rxjs';
import * as BookActions from './../actions/book.actions'
import { BooksState } from '../reducers/book.reducer';

@Component({
  selector: 'app-books-list',
  templateUrl: './books-list.component.html',
  styleUrls: ['./books-list.component.css']
})
export class BooksListComponent implements OnInit {
  books: Observable<Book[]>;
  selectedBook: Book;

  constructor(private store: Store<AppState>) {
    this.books = this.store.select((state) => {return state.books})
   }

  ngOnInit(): void {
   
  }
  deleteBook(book: Book) {
    this.store.dispatch(new BookActions.RemoveBook(book));
  }

  selectBook(book: Book) {
    this.selectedBook = {...book};
  }
  updateBook() {
    this.store.dispatch(new BookActions.UpdateBook(this.selectedBook));
    this.selectedBook = null;
  }
}
