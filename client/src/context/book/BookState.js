import React, { useReducer } from "react";
import axios from "axios";
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
  BOOK_ERROR,
  GET_BOOKS,
  CLEAR_BOOKS,
} from "../types";

const BookState = (props) => {
  const initialState = {
    books: null,
    loading: true,
    current: null,
    filter: null,
    errors: null,
  };
  const [state, dispatch] = useReducer(bookReducer, initialState);

  //Get Books
  const getBooks = async () => {
    try {
      const res = await axios.get("/api/books");
      dispatch({ type: GET_BOOKS, payload: res.data });
    } catch (err) {
      console.log(err.response.data.msg);
      dispatch({ type: BOOK_ERROR, payload: err.response.data.msg });
    }
  };

  //Add Book
  const addBook = async (book) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    try {
      const res = await axios.post("/api/books", book, config);
      dispatch({ type: ADD_BOOK, payload: res.data });
    } catch (err) {
      console.log(err.response.data.errors[0].msg);
      dispatch({ type: BOOK_ERROR, payload: err.response.data.errors[0].msg });
    }
  };
  //update book
  const updateBook = async (book) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    try {
      await axios.put(`/api/books/${book._id}`, book, config);
      dispatch({ type: UPDATE_BOOK, payload: book });
      if (state.filter) {
        clearFilter();
      }
    } catch (err) {
      console.log(err.response);
      dispatch({ type: BOOK_ERROR, payload: err.response });
    }
  };
  //Delete Book
  const deleteBook = async (id) => {
    try {
      await axios.delete(`/api/books/${id}`);
      dispatch({ type: DELETE_BOOK, payload: id });
      if (state.filter) {
        clearFilter();
      }
    } catch (err) {
      console.log(err.response);
      dispatch({ type: BOOK_ERROR, payload: err.response });
    }
  };

  //Clear books
  const clearBooks = () => {
    dispatch({ type: CLEAR_BOOKS });
  };

  //set current
  const setCurrent = (book) => {
    dispatch({ type: SET_CURRENT, payload: book });
  };
  //clear current
  const clearCurrent = () => {
    dispatch({ type: CLEAR_CURRENT });
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
        errors: state.errors,
        loading: state.loading,
        getBooks,
        addBook,
        deleteBook,
        setCurrent,
        clearCurrent,
        updateBook,
        filterBooks,
        clearFilter,
        clearBooks,
      }}
    >
      {props.children}
    </BookContext.Provider>
  );
};

export default BookState;
