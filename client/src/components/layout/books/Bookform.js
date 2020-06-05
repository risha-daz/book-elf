import React, { useState, useContext, useEffect } from "react";
import BookContext from "../../../context/book/bookContext";
import Autofill from "./Autofill";

let googleApiKey;

if (process.env.NODE_ENV !== "production") {
  googleApiKey = process.env.APP_GOOGLE_API_KEY;
} else {
  googleApiKey = process.env.GOOGLE_API_KEY;
}

const Bookform = () => {
  const bookContext = useContext(BookContext);
  const { current, clearCurrent, autofill } = bookContext;

  const [book, setBook] = useState({
    title: "",
    author: "",
    genre: "",
    read: false,
    genre_custom: "",
    description: "",
    add_desc: false,
    rating: 1,
    show_autofill: false,
  });

  useEffect(() => {
    if (current) {
      let a = current.description ? true : false;
      setBook({ ...current, add_desc: a });
    } else {
      setBook({
        title: "",
        author: "",
        genre: "",
        read: false,
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
    add_desc,
    rating,
    show_autofill,
  } = book;

  const onChange = (e) => {
    setBook({ ...book, [e.target.name]: e.target.value });
  };

  const toggleRead = (e) => {
    setBook({ ...book, read: !read });
  };

  const toggleAutofill = (e) => {
    e.preventDefault();
    setBook({ ...book, show_autofill: !show_autofill });
  };

  const onAutofill = async (e) => {
    const search = await autofill({ title: title, key: googleApiKey });
    setBook({
      ...book,
      title: search.tit,
      author: search.author,
      description: search.desc,
      rating: search.rat,
      add_desc: true,
    });
  };
  const toggleDesc = (e) => {
    setBook({ ...book, add_desc: !add_desc });
  };
  const clear = () => {
    clearCurrent();
  };
  const onRate = (e) => {
    e.preventDefault();
    let val = e.target.name;

    setBook({ ...book, rating: val });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    let gen = genre === "Custom" ? genre_custom : genre;
    if (current === null) {
      bookContext.addBook({
        title: title,
        author: author,
        genre: gen,
        read: read,
        description: description,
        rating: rating,
      });
    } else {
      bookContext.updateBook({
        _id: current._id,
        title: title,
        author: author,
        genre: gen,
        read: read,
        description: description,
        rating: rating,
      });
    }
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
    <form onSubmit={onSubmit} id='bookform'>
      <h2 className='text-primary'>{current ? "Edit Book" : "Add New Book"}</h2>
      <h6>
        <button className='btnstl' onClick={toggleAutofill}>
          <i
            className={`fas fa-caret-${!show_autofill ? "right" : "down"}`}
          ></i>
        </button>
        Advanced Options <sup>BETA</sup>
      </h6>
      {show_autofill && <Autofill onAutofill={onAutofill} />}
      <input
        type='text'
        placeholder={show_autofill ? "Title/author or other..." : "Title"}
        name='title'
        value={title}
        onChange={onChange}
        required
      />
      <input
        type='text'
        placeholder='Author'
        name='author'
        value={author}
        onChange={onChange}
      />
      {/*<input
        type='text'
        list='genres'
        placeholder='Genre'
        size='3'
        name='genre'
        value={genre}
        onChange={onChange}
      />
      <datalist id='genres'>
        <option value='Fiction' />
        <option value='Non-Fiction' />
        <option value='Fantasy' />
        <option value='Romance' />
        <option value='Action/Adventure' />
        <option value='Horror/Thriller' />
        <option value='Sci-fi' />
        <option value='Mystery' />
     </datalist> */}
      <select name='genre' value={genre} onChange={onChange}>
        <option value=''>Add Genre..</option>
        <option value='Fiction'>Fiction</option>
        <option value='Non-Fiction'>Non-Fiction</option>
        <option value='Fantasy'>Fantasy</option>
        <option value='Romance'>Romance</option>
        <option value='Action/Adventure'>Action/Adventure</option>
        <option value='Horror/Thriller'>Horror/Thriller</option>
        <option value='Sci-fi'>Sci-fi</option>
        <option value='Mystery'>Mystery</option>
        <option value='Custom'>Custom...</option>
      </select>
      {genre === "Custom" && (
        <input
          type='text'
          placeholder='Genre'
          name='genre_custom'
          value={genre_custom}
          onChange={onChange}
        />
      )}
      <br></br>
      <div
        className={`btn btn-sm btn-${read ? "success" : "danger"}`}
        onClick={toggleRead}
      >
        {read ? (
          <i className='fas fa-check-circle'></i>
        ) : (
          <i className='fas fa-times-circle'></i>
        )}
      </div>{" "}
      Read the book
      {/*<input
        type='checkbox'
        name='read'
        onChange={toggleRead}
        checked={read === true ? true : ""}
      />*/}
      <fieldset>
        <legend>
          <h4>Reviews:</h4>
        </legend>

        <div style={{ padding: "15px" }}>
          <label>Rating: {"  "}</label>
          <button
            className={`btnstl fa${
              rating >= 1 ? "s text-primary" : "r"
            } fa-star`}
            name='1'
            onClick={onRate}
          ></button>
          <button
            className={`btnstl fa${
              rating >= 2 ? "s text-primary" : "r"
            } fa-star`}
            name='2'
            onClick={onRate}
          ></button>
          <button
            className={`btnstl fa${
              rating >= 3 ? "s text-primary" : "r"
            } fa-star`}
            name='3'
            onClick={onRate}
          ></button>
          <button
            className={`btnstl fa${
              rating >= 4 ? "s text-primary" : "r"
            } fa-star`}
            name='4'
            onClick={onRate}
          ></button>
          <button
            className={`btnstl fa${
              rating >= 5 ? "s text-primary" : "r"
            } fa-star`}
            name='5'
            onClick={onRate}
          ></button>
        </div>
        <div style={{ padding: "15px" }}>
          <div
            className={`btn btn-${add_desc ? "danger" : "primary"} btn-sm`}
            onClick={toggleDesc}
          >
            {add_desc ? (
              <i className='fas fa-minus-circle'></i>
            ) : (
              <i className='fas fa-plus-circle'></i>
            )}
          </div>

          <label>
            Add a description/summary
            {add_desc && (
              <textarea
                value={description}
                name='description'
                onChange={onChange}
                style={{ height: "100px" }}
              />
            )}
          </label>
        </div>
      </fieldset>
      <div>
        <input
          type='submit'
          value={current ? "Update Book" : "Add Book"}
          className='btn btn-primary btn-block'
        />
      </div>
      {current && (
        <button className='btn btn-light btn-block' onClick={clear}>
          Clear
        </button>
      )}
    </form>
  );
};

export default Bookform;
