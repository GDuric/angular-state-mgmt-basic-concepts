import { Action } from '@ngrx/store'
import { Author } from './../models/author.model'

export const ADD_AUTHOR = 'ADD_AUTHOR';
export const REMOVE_AUTHOR = 'REMOVE_AUTHOR';
export const UPDATE_AUTHOR = 'UPDATE_AUTHOR';

export class AddAuthor implements Action {
    readonly type = ADD_AUTHOR;

    constructor(public payload: Author) {}
}

export class RemoveAuthor implements Action {
    readonly type = REMOVE_AUTHOR;

    constructor(public payload: Author) {}
}

export class UpdateAuthor implements Action {
    readonly type = UPDATE_AUTHOR;

    constructor(public payload: Author) {}
}

export type Actions = AddAuthor | RemoveAuthor | UpdateAuthor;