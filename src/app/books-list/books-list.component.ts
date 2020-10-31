import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Book } from './../models/book.model';
import { AppState } from '../app.state';
import { Observable, Subscription } from 'rxjs';
import * as BookActions from './../actions/book.actions'
import { map } from 'rxjs/operators';
import * as AuthorActions from './../actions/author.actions';
import { Author } from '../models/author.model';
import { _provideForRootGuard } from '@ngrx/store/src/store_module';
@Component({
  selector: 'app-books-list',
  templateUrl: './books-list.component.html',
  styleUrls: ['./books-list.component.css']
})
export class BooksListComponent implements OnInit {
  books: Observable<Book[]>;
  selectedBook: Book;
  selectedAuthor: string;
  author: Author[];
  authorId: number;
  getIdSubscription: Subscription;

  constructor(private store: Store<AppState>) {
    this.books = this.store.select((state) => {return state.books})
   }

  ngOnInit(): void {
   
  }
  deleteBook(book: Book) {
    this.store.dispatch(new BookActions.RemoveBook(book));

    this.store.select('authors').pipe(map(authors => authors.filter( author => author.name === book.author))).subscribe( 
      value => {
        this.author = value;
      } 
    );
    const authorToRemove = {...this.author[0]};
    let  authorToUpdate = authorToRemove;
    this.updateAuthor(authorToUpdate);
  }

  private updateAuthor(author: Author) {
    if(author.numberOfBooks > 1) {
      author.numberOfBooks--;
      
      this.store.dispatch(new AuthorActions.UpdateAuthor( { id: author.id, name: author.name, numberOfBooks: author.numberOfBooks} ));
    } else {
      this.store.dispatch(new AuthorActions.RemoveAuthor( author ))
    };
  }

  selectBook(book: Book) {
    this.selectedBook = {...book};
    this.selectedAuthor = this.selectedBook.author;
  }
  updateBook() {
    this.store.dispatch(new BookActions.UpdateBook(this.selectedBook));
   this.store.select('authors').pipe(map(authors => authors.filter( author => author.name === this.selectedAuthor))).subscribe( 
    value => {
      this.author = value;
     } 
   );
  
   if(this.author.length) {
    const authorModified= {...this.author[0]};
    if(authorModified.numberOfBooks === 1) {
      this.store.dispatch(new AuthorActions.RemoveAuthor(authorModified));
      this.store.dispatch(new AuthorActions.AddAuthor( { id: authorModified.id, name: this.selectedBook.author, numberOfBooks: 1} ));
    } else {

      this.updateAuthor(authorModified);
      this.getIdSubscription = this.store.select('authors').subscribe(val => {
      const data = val;
      let newID = data[data.length-1].id;
      this.authorId = newID+1;
    })
      this.getIdSubscription.unsubscribe();
      this.store.dispatch(new AuthorActions.AddAuthor( { id: this.authorId, name: this.selectedBook.author, numberOfBooks: 1} )); 
    }
   } 
    this.selectedBook = null;
  }
}
