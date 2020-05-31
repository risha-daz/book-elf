import React, { useContext, Fragment } from "react";
import BookContext from "../../../context/book/bookContext";
import BookItem from "./BookItem";
import { CSSTransition, TransitionGroup } from "react-transition-group";

const Booklist = () => {
  const bookContext = useContext(BookContext);
  if (bookContext.books.length === 0) {
    return (
      <h4>
        No books! <i className='fas fa-heart-broken'></i>
      </h4>
    );
  }
  return (
    <Fragment>
      <TransitionGroup>
        {bookContext.filter !== null
          ? bookContext.filter.map((book) => (
              <CSSTransition key={book.id} timeout={500} classNames='item'>
                <BookItem book={book} />
              </CSSTransition>
            ))
          : bookContext.books.map((book) => (
              <CSSTransition key={book.id} timeout={500} classNames='item'>
                <BookItem book={book} />
              </CSSTransition>
            ))}
      </TransitionGroup>
    </Fragment>
  );
};

export default Booklist;
