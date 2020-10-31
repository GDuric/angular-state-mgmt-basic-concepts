import { Action } from '@ngrx/store'
import { Book } from './../models/book.model'
import * as BookActions from './../actions/book.actions'

export interface BooksState {
    books: Book[];
} 

const initialStates: BooksState = {
    books: []
}

export function bookReducer(state = [], action: BookActions.Actions) {
    switch(action.type) {
        case BookActions.ADD_BOOK:
            return [ ...state, {...action.payload }];
        case BookActions.REMOVE_BOOK:                  
            const filteredState = state.filter(x => x.id !== action.payload.id);            
           return  filteredState;
        case BookActions.UPDATE_BOOK:                  
           let updatedBook = state.filter(x => x.id === action.payload.id);
           updatedBook = { ...updatedBook, ...action.payload };  
           const books = state.filter(x => x.id !== action.payload.id); 
          return  [...books, updatedBook];
        default:
            return state;
    }
}
