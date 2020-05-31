import React, { useState, useContext, useEffect } from "react";
import BookContext from "../../../context/book/bookContext";

const Bookform = () => {
  const bookContext = useContext(BookContext);
  const { current, clearCurrent } = bookContext;

  const [book, setBook] = useState({
    title: "",
    author: "",
    genre: "",
    read: false,
  });

  useEffect(() => {
    if (current) {
      setBook(current);
    } else {
      setBook({
        title: "",
        author: "",
        genre: "",
        read: false,
      });
    }
  }, [bookContext, current]);

  const { title, author, genre, read } = book;

  const onChange = (e) => {
    setBook({ ...book, [e.target.name]: e.target.value });
  };

  const toggleRead = (e) => {
    setBook({ ...book, read: !read });
  };

  const clear = () => {
    clearCurrent();
  };

  const onSubmit = (e) => {
    e.preventDefault();
    if (current === null) {
      bookContext.addBook(book);
    } else {
      bookContext.updateBook(book);
    }
    setBook({
      title: "",
      author: "",
      genre: "",
      read: false,
    });
  };

  return (
    <form onSubmit={onSubmit}>
      <h2 className='text-primary'>{current ? "Edit Book" : "Add New Book"}</h2>
      <input
        type='text'
        placeholder='Title'
        name='title'
        value={title}
        onChange={onChange}
      />
      <input
        type='text'
        placeholder='Author'
        name='author'
        value={author}
        onChange={onChange}
      />
      <input
        type='text'
        placeholder='Genre'
        name='genre'
        value={genre}
        onChange={onChange}
      />
      <h4>Already read this book? </h4>
      {/* <button>{read ? ( <i class='fas fa-check-circle'></i>) : (<i class='fas fa-times-circle'></i>)}</button> */}
      <input
        type='checkbox'
        name='read'
        onChange={toggleRead}
        checked={read === true ? true : ""}
      />
      {"  "}Yeah!
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
