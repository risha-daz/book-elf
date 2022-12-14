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
  CLEAR_BOOK_PAGE,
  BOOK_DETAILS_RECIEVED,
} from "../types";

const BookState = (props) => {
  const initialState = {
    books: null,
    loading: true,
    current: null,
    filter: null,
    errors: null,
    bookpage: null,
  };
  const [state, dispatch] = useReducer(bookReducer, initialState);

  //Get Books
  const getBooks = async () => {
    try {
      const res = await axios.get("/api/books");
      dispatch({ type: GET_BOOKS, payload: res.data });
    } catch (err) {
      console.log(err.response);
      dispatch({ type: BOOK_ERROR, payload: err.response });
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
      console.log(err.response);
      dispatch({ type: BOOK_ERROR, payload: err.response });
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

  //Add Image
  const uploadImage = async (file) => {
    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    };
    try {
      const res = await axios.post("/api/imageuploads", file, config);
      console.log(res.data.url);
      return res.data.url;
    } catch (err) {
      console.log(err.response);
    }
  };

  const updateImage = () => {
    console.log("object");
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

  //Autofill fields
  const autofill = async (title) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    try {
      const res = await axios.post("/api/google", title, config);
      try {
        const author = res.data.items[0].volumeInfo.authors[0] || "";
        const desc = res.data.items[0].volumeInfo.description || "";
        const tit = res.data.items[0].volumeInfo.title || "";
        const rat = res.data.items[0].volumeInfo.averageRating || 0;
        const thumb = res.data.items[0].volumeInfo.imageLinks.thumbnail || "";
        return { author, desc, tit, rat, thumb };
      } catch (err) {
        return {
          author: "not found",
          desc: "not found",
          tit: "not found",
          rat: 1,
          thumb: "",
        };
      }
    } catch (err) {
      console.log(err);
      dispatch({ type: BOOK_ERROR, payload: err });
    }
  };

  //set current
  const setBookpage = (book) => {
    dispatch({ type: BOOK_DETAILS_RECIEVED, payload: book });
  };
  //clear current
  const clearBookpage = () => {
    dispatch({ type: CLEAR_BOOK_PAGE });
  };
  return (
    <BookContext.Provider
      value={{
        books: state.books,
        current: state.current,
        filter: state.filter,
        errors: state.errors,
        loading: state.loading,
        bookpage: state.bookpage,
        getBooks,
        addBook,
        deleteBook,
        setCurrent,
        clearCurrent,
        updateBook,
        filterBooks,
        clearFilter,
        clearBooks,
        setBookpage,
        clearBookpage,
        autofill,
        uploadImage,
        updateImage,
      }}
    >
      {props.children}
    </BookContext.Provider>
  );
};

export default BookState;
