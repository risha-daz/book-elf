import React, { useContext, useEffect, Fragment } from "react";
import Booklist from "../layout/books/Booklist";
import Book from "./Book";
import Bookform from "../layout/books/Bookform";
import Bookfilter from "../layout/books/Bookfilter";
import AuthContext from "../../context/auth/authContext";
import BookContext from "../../context/book/bookContext";

const Home = () => {
  const authContext = useContext(AuthContext);
  const bookContext = useContext(BookContext);
  const { loadUser } = authContext;
  const { bookpage } = bookContext;
  useEffect(() => {
    loadUser();

    //eslint-disable-next-line
  }, []);

  return (
    <Fragment>
      {bookpage !== null ? (
        <div className='container'>
          <Book />
        </div>
      ) : (
        <div className='grid-2'>
          <div>
            <Bookform />
          </div>

          <div>
            <Bookfilter />
            <Booklist />
          </div>
        </div>
      )}
    </Fragment>
  );
};

export default Home;
