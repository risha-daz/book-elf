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
  Box,
  CardActionArea,
  CardContent,
  Tooltip,
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
import NoImage from "../../../no_image.jpg";
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
  input: { display: "none" },
  minorContainer: {
    margin: 20,
  },
  majorContainer: {
    display: "flex",
  },
  mobileContainer: {
    display: "flex",
    flexDirection: "column",
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
  const [file, setFile] = useState();
  const handleClickOpen = () => {
    setOpen(!open);
  };
  const smallScreen = useMediaQuery(theme.breakpoints.down("xs"));
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
  });
  useEffect(() => {
    if (current) {
      setBook({ ...current });
      if (bookContext.current.cover) {
        setFile(bookContext.current.cover);
      } else {
        setFile(null);
      }
    } else {
      setFile(null);
      setBook({
        title: "",
        author: "",
        genre: "",
        read: "false",
        description: "",
        rating: 1,
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
    rating,
  } = book;

  const onChange = (e) => {
    setBook({ ...book, [e.target.name]: e.target.value });
  };

  const imgUploaded = async (e) => {
    setFile(e.target.files[0]);

    let formData = new FormData();
    formData.set("coverimage", e.target.files[0]);
    const coverurl = await bookContext.uploadImage(formData);
    setFile(coverurl);
  };

  const onAutofill = async (e) => {
    const search = await autofill({ title });
    try {
      setBook({
        ...book,
        title: search.tit,
        author: search.author,
        description: search.desc,
        rating: search.rat,
      });
      if (search.thumb) {
        setFile(search.thumb);
      }
    } catch (err) {
      clear();
    }
  };

  const clear = (e) => {
    e.preventDefault();
    clearCurrent();
    setFile(null);
    setBook({
      title: "",
      author: "",
      genre: "",
      read: false,
      description: "",
      rating: 1,
    });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    let gen = genre === "Custom" ? genre_custom : genre;
    if (current === null) {
      bookContext.addBook({
        title,
        author,
        genre: gen,
        read,
        description,
        rating,
        cover: file,
      });
    } else {
      bookContext.updateBook({
        _id: current._id,
        title,
        author,
        genre: gen,
        read,
        description,
        rating,
        cover: file,
      });
    }
    setFile(null);
    setBook({
      title: "",
      author: "",
      genre: "",
      read: false,
      description: "",
      rating: 1,
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
          <Box
            className={
              smallScreen ? styles.mobileContainer : styles.majorContainer
            }
          >
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                padding: "10px",
                textAlign: "center",
              }}
            >
              <img
                src={file || NoImage}
                alt='no image'
                style={{ width: "188px", margin: "10px" }}
              />

              <input
                accept='image/*'
                id='cover-upload'
                className={styles.input}
                type='file'
                onChange={imgUploaded}
              />
              <label htmlFor='cover-upload'>
                <Button variant='contained' color='primary' component='span'>
                  Upload
                </Button>
              </label>
              {/*<Button color='secondary'>
                <Icon>image_not_supported</Icon> Remove Image
              </Button>*/}
            </div>{" "}
            {!smallScreen && <Divider orientation='vertical' flexItem />}
            <Container
              maxWidth='md'
              className={smallScreen ? "" : styles.minorContainer}
            >
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
                    value={rating}
                    precision={1}
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
                <Tooltip title='Search google and fetch the first result'>
                  <Button onClick={onAutofill} color='primary'>
                    Autofill
                  </Button>
                </Tooltip>
                {/*<Button onClick={handleClose} color='primary'>
                  Cancel
            </Button>*/}
                <Button onClick={clear} color='primary'>
                  Clear
                </Button>
                <Button onClick={onSubmit} color='primary'>
                  Add book
                </Button>
              </CardActions>
            </Container>
          </Box>
        </Collapse>
      </CardContent>
    </Card>
  );
};
export default Bookform2;
