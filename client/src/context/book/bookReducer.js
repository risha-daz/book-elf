import {
  ADD_BOOK,
  DELETE_BOOK,
  UPDATE_BOOK,
  FILTER_BOOKS,
  CLEAR_CURRENT,
  SET_CURRENT,
  CLEAR_FILTER,
} from "../types";

export default (state, action) => {
  switch (action.type) {
    case ADD_BOOK:
      return {
        ...state,
        books: [...state.books, action.payload],
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
    case UPDATE_BOOK:
      return {
        ...state,
        books: state.books.map((book) =>
          book.id !== action.payload.id ? book : action.payload
        ),

        current: null,
      };
    case DELETE_BOOK:
      return {
        ...state,
        books: state.books.filter((book) => book.id !== action.payload),
      };
    default:
      return state;
  }
};
