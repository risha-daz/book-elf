import {
  ADD_BOOK,
  DELETE_BOOK,
  UPDATE_BOOK,
  FILTER_BOOKS,
  CLEAR_CURRENT,
  SET_CURRENT,
  CLEAR_FILTER,
  BOOK_ERROR,
  GET_BOOKS,
  CLEAR_BOOKS,
} from "../types";

export default (state, action) => {
  switch (action.type) {
    case GET_BOOKS:
      return {
        ...state,
        books: action.payload,
        loading: false,
      };
    case ADD_BOOK:
      return {
        ...state,
        books: [action.payload, ...state.books],
        loading: false,
      };
    case SET_CURRENT:
      return {
        ...state,
        current: action.payload,
      };
    case CLEAR_CURRENT:
      return {
        ...state,
        current: null,
      };
    case FILTER_BOOKS:
      return {
        ...state,
        filter: state.books.filter((book) => {
          const keyword = RegExp(`${action.payload}`, "gi");
          return (
            book.title.match(keyword) ||
            book.author.match(keyword) ||
            book.genre.match(keyword)
          );
        }),
      };
    case CLEAR_FILTER:
      return {
        ...state,
        filter: null,
      };
    case CLEAR_BOOKS:
      return {
        ...state,
        filter: null,
        books: null,
        loading: false,
        current: null,
        errors: null,
      };
    case UPDATE_BOOK:
      return {
        ...state,
        books: state.books.map((book) =>
          book._id !== action.payload._id ? book : action.payload
        ),
        loading: false,
        current: null,
      };
    case DELETE_BOOK:
      return {
        ...state,
        loading: false,
        books: state.books.filter((book) => book._id !== action.payload),
      };
    case BOOK_ERROR:
      return { ...state, errors: action.payload };
    default:
      return state;
  }
};
