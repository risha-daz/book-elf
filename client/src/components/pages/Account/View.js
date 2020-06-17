import React, { useContext } from "react";
import BookContext from "../../../context/book/bookContext";
import { Container, Typography, Icon } from "@material-ui/core";
const View = () => {
  const bookContext = useContext(BookContext);
  const { name, email } = bookContext;
  return (
    <Container>
      {bookContext.avatar ? (
        <img src={bookContext.avatar} />
      ) : (
        <Icon>person</Icon>
      )}
      <Typography>Name: {name}</Typography>
      <Typography>Email: {email}</Typography>
    </Container>
  );
};

export default View;
