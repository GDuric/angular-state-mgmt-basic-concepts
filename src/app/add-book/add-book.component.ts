import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from './../app.state';
import * as BookActions from './../actions/book.actions';
import * as AuthorActions from './../actions/author.actions';
import { map } from 'rxjs/operators';
import { Author } from '../models/author.model';

@Component({
  selector: 'app-add-book',
  templateUrl: './add-book.component.html',
  styleUrls: ['./add-book.component.css']
})
export class AddBookComponent implements OnInit {

  bookTitle: string;
  bookAuthor: string;
  bookId: number = 0;
  authorId: number = 0;
  author: Author[];
  constructor(private store: Store<AppState>) {
  }

  ngOnInit(): void {
  }
  

  addBook() {
    this.store.dispatch(new BookActions.AddBook({title: this.bookTitle, author: this.bookAuthor, id: this.bookId++}) );
    this.store.select('authors').pipe(map(authors => authors.filter( author => author.name === this.bookAuthor))).subscribe( 
      value => {
        this.author = value;
      } 
    );
    if(this.author.length) {
      const author = {...this.author[0]};
      author.numberOfBooks = ++author.numberOfBooks;
      this.store.dispatch(new AuthorActions.AddAuthor( { id: author.id, name: this.bookAuthor, numberOfBooks: author.numberOfBooks} ));
    } else this.store.dispatch(new AuthorActions.AddAuthor( { id: this.authorId++, name: this.bookAuthor, numberOfBooks:  1} ));
  }
}
