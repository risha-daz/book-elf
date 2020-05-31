import React, { useReducer } from "react";
import { v4 as uuidv4 } from "uuid";
import BookContext from "./bookContext";
import bookReducer from "./bookReducer";

import {
  ADD_BOOK,
  DELETE_BOOK,
  UPDATE_BOOK,
  FILTER_BOOKS,
  CLEAR_CURRENT,
  CLEAR_FILTER,
  SET_CURRENT,
} from "../types";

const BookState = (props) => {
  const initialState = {
    books: [
      {
        id: 1,
        title: "Harry Potter and the Philosopher's Stone",
        author: "JK Rowling",
        genre: "fantasy",
        read: true,
      },
      {
        id: 2,
        title: "Harry Potter and the Chamber of Secrets",
        author: "JK Rowling",
        genre: "fantasy",
        read: true,
      },
      {
        id: 3,
        title: "Percy Jackson and the Lightning Thief",
        author: "Rick Riordan",
        genre: "fantasy",
        read: false,
      },
    ],
    current: null,
    filter: null,
  };
  const [state, dispatch] = useReducer(bookReducer, initialState);

  //Add Book
  const addBook = (book) => {
    book.id = uuidv4();
    dispatch({ type: ADD_BOOK, payload: book });
  };

  //Delete Book
  const deleteBook = (id) => {
    dispatch({ type: DELETE_BOOK, payload: id });
  };

  //set current
  const setCurrent = (book) => {
    dispatch({ type: SET_CURRENT, payload: book });
  };
  //clear current
  const clearCurrent = () => {
    dispatch({ type: CLEAR_CURRENT });
  };
  //update contact
  const updateBook = (book) => {
    dispatch({ type: UPDATE_BOOK, payload: book });
  };

  //filter books
  const filterBooks = (text) => {
    dispatch({ type: FILTER_BOOKS, payload: text });
  };
  //clear filter
  const clearFilter = () => {
    dispatch({ type: CLEAR_FILTER });
  };

  return (
    <BookContext.Provider
      value={{
        books: state.books,
        current: state.current,
        filter: state.filter,
        addBook,
        deleteBook,
        setCurrent,
        clearCurrent,
        updateBook,
        filterBooks,
        clearFilter,
      }}
    >
      {props.children}
    </BookContext.Provider>
  );
};

export default BookState;
