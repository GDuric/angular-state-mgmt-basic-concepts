import { Action } from '@ngrx/store'
import { Book } from './../models/book.model'

export const ADD_BOOK = 'ADD_BOOK'
export const REMOVE_BOOK = 'REMOVE_BOOK'
export const UPDATE_BOOK = 'UPDATE_BOOK'

export class AddBook implements Action {
    readonly type = ADD_BOOK;

    constructor(public payload: Book) {}
}

export class RemoveBook implements Action {
    readonly type = REMOVE_BOOK;

    constructor(public payload: Book) {}
}

export class UpdateBook implements Action {
    readonly type = UPDATE_BOOK;

    constructor(public payload: Book) {}
}

export type Actions = AddBook | RemoveBook | UpdateBook;