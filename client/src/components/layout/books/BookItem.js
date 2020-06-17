import React, { useContext, useState } from "react";
import BookContext from "../../../context/book/bookContext";
import { Link } from "react-router-dom";
import NoImage from "../../../no_image.jpg";
import { useTheme } from "@material-ui/core/styles";

import {
  Card,
  CardActions,
  CardContent,
  Typography,
  Grid,
  CardActionArea,
  Icon,
  Box,
  Avatar,
  useMediaQuery,
  List,
  ListItem,
  ListItemAvatar,
  Chip,
  CardHeader,
  IconButton,
  Collapse,
  ListItemText,
  CardMedia,
  Container,
} from "@material-ui/core";
import Rating from "@material-ui/lab/Rating";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  readStatusSuccess: {
    backgroundColor: theme.palette.success.main,
  },
  readStatusReading: {
    backgroundColor: theme.palette.primary.main,
  },
  readStatusError: {
    backgroundColor: theme.palette.error.main,
  },
  boxStyle: {
    minHeight: 360,
  },
  cardStyle: {
    backgroundColor: "#eceace",
    maxWidth: 900,
    display: "flex",
  },
  mobileCardStyle: {
    backgroundColor: "#eceace",
  },
  iconBox: {
    textAlign: "center",
  },
  cover: { width: 200 },
  mobilecover: {
    height: 200,
  },
}));

const BookItem = ({ book }) => {
  const theme = useTheme();
  const styles = useStyles();
  const bookContext = useContext(BookContext);
  const { _id, title, author, genre, read, description, rating, cover } = book;
  const { clearCurrent, setCurrent, deleteBook, setBookpage } = bookContext;
  const smallScreen = useMediaQuery(theme.breakpoints.down("xs"));
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
    <Card className={smallScreen ? styles.mobileCardStyle : styles.cardStyle}>
      <CardMedia
        className={smallScreen ? styles.mobilecover : styles.cover}
        image={cover || NoImage}
        title='Default Image'
      />
      <CardActionArea onClick={fullDesc}>
        <CardContent>
          <Chip
            icon={
              read.toString() === "false" ? (
                <Icon>clear</Icon>
              ) : read.toString() === "true" ? (
                <Icon>check</Icon>
              ) : (
                <Icon>local_library</Icon>
              )
            }
            label={
              read.toString() === "false"
                ? "Not Read"
                : read.toString() === "true"
                ? "Read"
                : "Reading"
            }
            color='primary'
            style={{ float: "right" }}
            className={
              read.toString() === "false"
                ? styles.readStatusError
                : read.toString() === "true"
                ? styles.readStatusSuccess
                : styles.readStatusReading
            }
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
        <Container className={styles.iconBox}>
          <Grid container>
            <Grid item xs={4} sm={12}>
              <IconButton
                onClick={edit}
                size={smallScreen ? "small" : "medium"}
              >
                <i className='fas fa-pen'></i>
              </IconButton>
            </Grid>
            <Grid item xs={4} sm={12}>
              <IconButton onClick={del} size={smallScreen ? "small" : "medium"}>
                <i className='far fa-trash-alt'></i>
              </IconButton>
            </Grid>
            <Grid item xs={4} sm={12}>
              <IconButton
                onClick={getBook}
                size={smallScreen ? "small" : "medium"}
              >
                <i className='fas fa-book-open'></i>
              </IconButton>
            </Grid>
          </Grid>
        </Container>
      </CardActions>
    </Card>
  );
};

export default BookItem;
