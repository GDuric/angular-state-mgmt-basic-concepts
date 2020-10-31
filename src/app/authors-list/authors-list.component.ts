import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Author } from '../models/author.model';
import { Store } from '@ngrx/store';
import { AppState } from '../app.state';

@Component({
  selector: 'app-authors-list',
  templateUrl: './authors-list.component.html',
  styleUrls: ['./authors-list.component.css']
})
export class AuthorsListComponent implements OnInit {
  authors: Observable<Author[]>;
  authorNameSearch: string;
  
  constructor(private store: Store<AppState>) {
    this.authors = this.store.select((state) => {return state.authors})
   }

  ngOnInit(): void {
  }

}
