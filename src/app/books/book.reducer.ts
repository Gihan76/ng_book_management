import { createReducer, on } from "@ngrx/store";
import { AddBook, AddBookSuccess, AddBookFailure, RemoveBook } from "./book.actions";
import { Book } from "../models/book";

export const initialState: Book[] = [];

export const bookReducer = createReducer(
    initialState,

    // intial add book action which returns current state
    on(AddBook, (state) => { return state }),

    // based on the Add Book action result -> success (AddBookSuccess) will trigger
    on(AddBookSuccess, (state, { id, title, author }) => [...state, { id, title, author }]),

    /**
     * based on the Add Book action result -> failure (AddBookFailure) will trigger 
     * which returns the current state unchanged with error
     */
    on(AddBookFailure, (state, { error}) => { 
        console.error(error); 
        return state;
    }),

    on(RemoveBook, (state, { bookId }) =>
        state.filter(book => book.id !== bookId)
    ),
);