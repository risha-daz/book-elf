import React, { useState, useContext, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  Button,
  TextField,
  InputLabel,
  Select,
  useMediaQuery,
  Icon,
  Collapse,
  Card,
  CardActionArea,
  CardContent,
  Avatar,
  ExpansionPanelDetails,
  MenuItem,
  FormControl,
  Container,
  Typography,
  Divider,
  CardHeader,
  IconButton,
  CardActions,
  FormGroup,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormLabel,
} from "@material-ui/core";
import ImageUpload from "./ImageUpload";
import Rating from "@material-ui/lab/Rating";
import BookContext from "../../../context/book/bookContext";
import { useTheme } from "@material-ui/core/styles";
const useStyles = makeStyles((theme) => ({
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: "58ch",
  },
  formControl: {
    margin: theme.spacing(2),
    width: 405,
  },
  titleContainer: {
    textAlign: "left",
    backgroundColor: "#eceace",
  },
  minorContainer: {
    margin: 20,
  },
  majorContainer: {
    display: "flex",
  },
  labelContainer: {
    textAlign: "center",
    marginTop: 30,
  },
}));

const Bookform2 = () => {
  const theme = useTheme();
  const styles = useStyles();
  const [open, setOpen] = useState(false);
  const handleClickOpen = () => {
    setOpen(!open);
  };
  const fullScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const handleClose = () => {
    setOpen(false);
    clearCurrent();
    setBook({
      title: "",
      author: "",
      genre: "",
      read: "false",
      description: "",
      rating: 1,
      image: null,
    });
  };

  const bookContext = useContext(BookContext);
  const { current, clearCurrent, autofill } = bookContext;
  const [book, setBook] = useState({
    title: "",
    author: "",
    genre: "",
    read: "false",
    genre_custom: "",
    description: "",
    rating: 0.5,
    image: null,
  });
  useEffect(() => {
    if (current) {
      setBook({ ...current });
    } else {
      setBook({
        title: "",
        author: "",
        genre: "",
        read: "false",
        description: "",
        rating: 1,
        image: null,
      });
    }
  }, [bookContext, current]);

  const {
    title,
    author,
    genre,
    read,
    genre_custom,
    description,
    image,
    rating,
  } = book;

  const onChange = (e) => {
    setBook({ ...book, [e.target.name]: e.target.value });
  };

  const onUploadImage = (file) => {
    setBook({ ...book, image: file });
  };

  const onAutofill = async (e) => {
    const search = await autofill({ title });
    setBook({
      ...book,
      title: search.tit,
      author: search.author,
      description: search.desc,
      rating: search.rat,
    });
  };

  const clear = (e) => {
    e.preventDefault();
    clearCurrent();
    setBook({
      title: "",
      author: "",
      genre: "",
      read: false,
      description: "",
      rating: 1,
      image: null,
    });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    let gen = genre === "Custom" ? genre_custom : genre;
    let formData = new FormData();
    formData.set("title", title);
    formData.set("author", author);
    formData.set("genre", gen);
    formData.set("read", read);
    formData.set("description", description);
    formData.set("rating", rating);
    formData.set("coverimage", image);

    if (current === null) {
      bookContext.addBook(formData);
    } else {
      formData.set("_id", current._id);
      bookContext.updateBook(formData);
    }
    setBook({
      title: "",
      author: "",
      genre: "",
      read: false,
      description: "",
      rating: 1,
      image: null,
    });
  };
  return (
    <Card className={styles.titleContainer}>
      <CardActionArea onClick={handleClickOpen}>
        <Container className={styles.labelContainer}>
          <Typography variant='h5'>
            <i className='fas fa-book' /> Add New Book
          </Typography>
        </Container>
      </CardActionArea>
      <CardContent>
        <Collapse in={open} timeout='auto' unmountOnExit>
          <Container className={styles.majorContainer}>
            <ImageUpload imagevalue={image} onUploadImage={onUploadImage} />
            <Divider orientation='vertical' flexItem />
            <Container maxWidth='md' className={styles.minorContainer}>
              <FormGroup>
                <FormControl fullWidth>
                  <TextField
                    label='Title'
                    variant='outlined'
                    margin='dense'
                    type='text'
                    name='title'
                    value={title}
                    required
                    onChange={onChange}
                  />
                  <TextField
                    type='text'
                    label='Author'
                    name='author'
                    variant='outlined'
                    margin='dense'
                    value={author}
                    onChange={onChange}
                  />
                </FormControl>
              </FormGroup>
              <FormControl fullWidth variant='outlined'>
                <InputLabel id='genre-label'>Genre</InputLabel>
                <Select
                  name='genre'
                  labelId='genre-label'
                  value={genre}
                  onChange={onChange}
                  label='Genre'
                >
                  <MenuItem value='' disabled>
                    Add Genre..
                  </MenuItem>
                  <MenuItem value='Fiction'>Fiction</MenuItem>
                  <MenuItem value='Non-Fiction'>Non-Fiction</MenuItem>
                  <MenuItem value='Fantasy'>Fantasy</MenuItem>
                  <MenuItem value='Romance'>Romance</MenuItem>
                  <MenuItem value='Action/Adventure'>Action/Adventure</MenuItem>
                  <MenuItem value='Horror/Thriller'>Horror/Thriller</MenuItem>
                  <MenuItem value='Sci-fi'>Sci-fi</MenuItem>
                  <MenuItem value='Mystery'>Mystery</MenuItem>
                </Select>
              </FormControl>
              <FormControl component='fieldset'>
                <Typography>Reading Status</Typography>
                <RadioGroup
                  row
                  aria-label='read'
                  name='read'
                  value={read}
                  onChange={onChange}
                >
                  <FormControlLabel
                    value='false'
                    control={<Radio />}
                    label='Not Read'
                  />
                  <FormControlLabel
                    value='reading'
                    control={<Radio />}
                    label='Reading'
                  />
                  <FormControlLabel
                    value='true'
                    control={<Radio />}
                    label='Read'
                  />
                </RadioGroup>
              </FormControl>
              <Container component='fieldset' mb={3}>
                <Typography component='legend'>
                  <h4>Reviews:</h4>
                </Typography>

                <div style={{ padding: "15px" }}>
                  <Typography>Rating</Typography>
                  <Rating
                    name='rating'
                    value={parseFloat(rating)}
                    precision={0.5}
                    onChange={onChange}
                  />
                  <Typography>Add a description</Typography>
                  <TextField
                    placeholder='Add a detailed description or a summary. Better to describe your review of a book instead of a book-ish summary'
                    multiline
                    fullWidth
                    name='description'
                    value={description}
                    variant='outlined'
                    onChange={onChange}
                  />{" "}
                </div>
              </Container>

              <CardActions>
                <Button onClick={onAutofill} color='primary'>
                  Autofill
                </Button>
                <Button onClick={handleClose} color='primary'>
                  Cancel
                </Button>
                <Button onClick={clear} color='primary'>
                  Clear
                </Button>
                <Button onClick={onSubmit} color='primary'>
                  Add book
                </Button>
              </CardActions>
            </Container>
          </Container>
        </Collapse>
      </CardContent>
    </Card>
  );
};
export default Bookform2;
