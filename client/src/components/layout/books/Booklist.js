import React, { useContext, Fragment, useState } from "react";
import BookContext from "../../../context/book/bookContext";
import BookItem from "./BookItem";
import Spinner from "../Spinner";
import { CSSTransition, TransitionGroup } from "react-transition-group";

const Booklist = () => {
  const bookContext = useContext(BookContext);
  const { filter, books, getBooks, loading } = bookContext;
  useState(() => {
    getBooks();
    //eslint-disable-next-line
  }, []);
  if (books !== null && books.length === 0 && !loading) {
    return (
      <h4>
        No books! <i className='fas fa-heart-broken'></i>
      </h4>
    );
  }
  return (
    <Fragment>
      {books !== null && !loading ? (
        <TransitionGroup>
          {filter !== null
            ? filter.map((book) => (
                <CSSTransition key={book._id} timeout={500} classNames='item'>
                  <BookItem book={book} />
                </CSSTransition>
              ))
            : books.map((book) => (
                <CSSTransition key={book._id} timeout={500} classNames='item'>
                  <BookItem book={book} />
                </CSSTransition>
              ))}
        </TransitionGroup>
      ) : (
        <Spinner />
      )}
    </Fragment>
  );
};

export default Booklist;
