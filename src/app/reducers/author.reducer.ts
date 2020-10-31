import { Author } from './../models/author.model'
import * as AuthorActions from './../actions/author.actions'

export interface AuthorState {
    authors: Author[];
} 

const initialStates: AuthorState = {
    authors: []
}

export function authorReducer(state = [], action: AuthorActions.Actions) {
    switch(action.type) {
        case AuthorActions.ADD_AUTHOR:
            const checkState = state.filter(x => x.name === action.payload.name)
            if (checkState.length === 0) {
                return [ ...state, {...action.payload }];
            } else {
                const filteredAuthor = state.filter(x => x.name === action.payload.name); 
                if (filteredAuthor.length) {
                    const filteredState = state.filter(x => x.name !== action.payload.name);   
                    return [ ...filteredState, {...action.payload}];
                } else {                    
                    return [ ...state, {...action.payload }];
                }
            }
        case AuthorActions.REMOVE_AUTHOR:  
        const checkAuthors = state.filter(x => x.name === action.payload.name)[0];
        if (checkAuthors && checkAuthors.numberOfBooks === 1) {
            const filteredState = state.filter(x => x.name !== action.payload.name);   
           return  filteredState;
        } else {
            const filteredState = state.filter(x => x.name !== action.payload.name);   
            return [ ...filteredState, {...action.payload}];
        }
            
        case AuthorActions.UPDATE_AUTHOR:                  
           let updatedAuthor = state.filter(x => x.name === action.payload.name);
           updatedAuthor = { ...updatedAuthor, ...action.payload };  
           const authors = state.filter(x => x.id !== action.payload.id); 
          return  [...authors, updatedAuthor];
        default:
            return state;
    }
}
