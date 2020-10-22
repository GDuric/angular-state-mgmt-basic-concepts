import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from './../app.state';
import { Book } from './../models/book.model'
import * as BookActions from './../actions/book.actions';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-add-book',
  templateUrl: './add-book.component.html',
  styleUrls: ['./add-book.component.css']
})
export class AddBookComponent implements OnInit {

  bookTitle: string;
  bookAuthor: string;
  id: number = 0;
  constructor(private store: Store<AppState>) {}

  ngOnInit(): void {
  }

  addBook() {
    this.store.dispatch(new BookActions.AddBook({title: this.bookTitle, author: this.bookAuthor, id: this.id++}) )
  }
}
