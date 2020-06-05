import React, { useContext } from "react";
import { Route, Redirect } from "react-router-dom";
import BookContext from "../../context/book/bookContext";

const BookRoute = ({ component: Component, ...rest }) => {
  const bookContext = useContext(BookContext);
  const { current } = bookContext;

  return (
    <Route
      {...rest}
      render={(props) =>
        current ? <Redirect to='/' /> : <Component {...props} />
      }
    />
  );
};

export default BookRoute;
