import React, { useContext, useState } from "react";
import BookContext from "../../../context/book/bookContext";
import { Link } from "react-router-dom";

const BookItem = ({ book }) => {
  const bookContext = useContext(BookContext);
  const { _id, title, author, genre, read, description, rating } = book;
  const { clearCurrent, setCurrent, deleteBook, getBookInfo } = bookContext;

  const [descr, setDescr] = useState({ full: false });
  const { full } = descr;
  const del = () => {
    deleteBook(_id);
    clearCurrent();
  };
  const edit = () => {
    setCurrent(book);
  };
  const fullDesc = (e) => {
    setDescr({ ...descr, full: !full });
  };

  const getBook = (e) => {
    getBookInfo(_id);
  };
  return (
    <div className='card bg-light'>
      <h3 className='text-primary text-left'>
        {title}
        {"  "}
        <span
          className={
            "badge " + (read === true ? "badge-success" : "badge-primary")
          }
          style={{ float: "right" }}
        >
          {read === true ? "Read" : "Not Read"}
        </span>
      </h3>

      <ul>
        {author && (
          <li>
            <i className='fas fa-pen-nib' />
            {"  "}
            {author}
          </li>
        )}
        {genre && (
          <li>
            <i className='fas fa-list-ul' />
            {"  "}
            {genre}
          </li>
        )}
        {description && (
          <li>
            <i className='far fa-comment-dots' />
            {"  "}
            {description.length > 180 && !full
              ? description.substring(0, 180) + "..."
              : description}
            {description.length > 180 && (
              <button
                onClick={fullDesc}
                style={{
                  float: "right",
                  cursor: "pointer",
                  outline: "none",
                  border: "none",
                  background: "none",
                }}
              >
                {!full ? (
                  <i className='fas fa-ellipsis-h' />
                ) : (
                  <i class='fas fa-ellipsis-v' />
                )}
              </button>
            )}
          </li>
        )}
      </ul>
      {rating && (
        <span className='badge badge-primary' style={{ float: "right" }}>
          {rating}
          <i className='fas fa-star' />
        </span>
      )}
      <p>
        <a href='#bookform'>
          <button className='btn btn-dark btn-sm' onClick={edit}>
            <i className='fas fa-pen'></i>
          </button>
        </a>
        <button className='btn btn-danger btn-sm' onClick={del}>
          <i className='far fa-trash-alt'></i>
        </button>
        {/*<Link to={`/book/${_id}`}>
          <div className='btn btn-sm btn-primary' onClick={getBook}>
            <i class='fas fa-book-open'></i>
          </div>
      </Link>*/}
      </p>
    </div>
  );
};

export default BookItem;
