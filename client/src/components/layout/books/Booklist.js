import React, { useContext, Fragment, useState } from "react";
import BookContext from "../../../context/book/bookContext";
import BookItem from "./BookItem";
import Spinner from "../Spinner";
import { Container, Grid } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import Bookfilter from "./Bookfilter";
import Bookform2 from "./Bookform2";

const useStyles = makeStyles((theme) => ({
  cardGrid: {
    paddingTop: theme.spacing(8),
    paddingBottom: theme.spacing(8),
  },
  card: {
    height: "100%",
    display: "flex",
    flexDirection: "column",
  },
  cardMedia: {
    paddingTop: "56.25%", // 16:9
  },
  cardContent: {
    flexGrow: 1,
  },
  footer: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(6),
  },
}));

const Booklist = () => {
  const bookContext = useContext(BookContext);
  const classes = useStyles();
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
        <Container className={classes.cardGrid} maxWidth='md'>
          <Bookfilter />

          <Grid container spacing={4}>
            <Grid item xs={12}>
              <Bookform2 />
            </Grid>
            {filter !== null
              ? filter.map((book) => (
                  <Grid item key={book._id} xs={12}>
                    <BookItem book={book} />
                  </Grid>
                ))
              : books.map((book) => (
                  <Grid item key={book._id} xs={12}>
                    <BookItem book={book} />
                  </Grid>
                ))}
          </Grid>
        </Container>
      ) : (
        <Spinner />
      )}
    </Fragment>
  );
};

export default Booklist;
