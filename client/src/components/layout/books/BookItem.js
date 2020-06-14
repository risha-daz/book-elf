import React, { useContext, useState } from "react";
import BookContext from "../../../context/book/bookContext";
import { Link } from "react-router-dom";
import NoImage from "../../../no_image.jpg";
import {
  Card,
  CardActions,
  CardContent,
  Typography,
  CardActionArea,
  Icon,
  Box,
  Avatar,
  List,
  ListItem,
  ListItemAvatar,
  Chip,
  CardHeader,
  IconButton,
  Collapse,
  ListItemText,
  CardMedia,
} from "@material-ui/core";
import Rating from "@material-ui/lab/Rating";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(() => ({
  readStatus: {
    position: "absolute",
    top: 20,
    right: 20,
  },
  boxStyle: {
    minHeight: 360,
  },
  cardStyle: {
    backgroundColor: "#eceace",
    maxWidth: 900,
    display: "flex",
  },
  cover: {
    width: 188,
  },
}));

const BookItem = ({ book }) => {
  const styles = useStyles();
  const bookContext = useContext(BookContext);
  const { _id, title, author, genre, read, description, rating, cover } = book;
  const { clearCurrent, setCurrent, deleteBook, setBookpage } = bookContext;

  const [full, setFull] = useState(false);

  const del = () => {
    deleteBook(_id);
    clearCurrent();
  };
  const edit = () => {
    setCurrent(book);
  };
  const fullDesc = (e) => {
    setFull(!full);
  };

  const getBook = (e) => {
    e.preventDefault();
    setBookpage(book);
  };
  return (
    <Card className={styles.cardStyle}>
      <CardMedia
        className={styles.cover}
        image={cover ? `uploads/${cover}` : NoImage}
        title='Default Image'
      />
      <CardActionArea onClick={fullDesc}>
        <CardContent>
          <Chip
            label={
              read.toString() === "false"
                ? "Not Read"
                : read.toString() === "true"
                ? "Read"
                : "Reading"
            }
            className={styles.readStatus}
            color='secondary'
          />
          <List disablePadding={true}>
            <ListItem divider>
              <ListItemText
                primary={<Typography variant='h5'>{title}</Typography>}
                secondary={rating && <Rating value={rating} readOnly />}
              />
            </ListItem>
            {(author || genre) && (
              <ListItem>
                <ListItemText primary={author || ""} secondary={genre || ""} />
              </ListItem>
            )}

            {description && (
              <ListItem>
                <Collapse in={full} timeout='auto'>
                  {description}
                </Collapse>
              </ListItem>
            )}
          </List>
        </CardContent>
      </CardActionArea>

      <CardActions>
        <List>
          <ListItem>
            <IconButton onClick={edit}>
              <i className='fas fa-pen'></i>
            </IconButton>
          </ListItem>
          <ListItem>
            <IconButton onClick={del}>
              <i className='far fa-trash-alt'></i>
            </IconButton>
          </ListItem>
          <ListItem>
            <IconButton onClick={getBook}>
              <i className='fas fa-book-open'></i>
            </IconButton>
          </ListItem>
        </List>
      </CardActions>
    </Card>
  );
};

export default BookItem;
