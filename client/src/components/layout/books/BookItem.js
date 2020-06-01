import React, { useContext } from "react";
import BookContext from "../../../context/book/bookContext";

const BookItem = ({ book }) => {
  const bookContext = useContext(BookContext);
  const { _id, title, author, genre, read } = book;
  const { clearCurrent, setCurrent, deleteBook } = bookContext;

  const del = () => {
    deleteBook(_id);
    clearCurrent();
  };
  const edit = () => {
    setCurrent(book);
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
      </ul>
      <p>
        <button className='btn btn-dark btn-sm' onClick={edit}>
          <i className='fas fa-pen'></i>
        </button>
        <button className='btn btn-danger btn-sm' onClick={del}>
          <i className='far fa-trash-alt'></i>
        </button>
      </p>
    </div>
  );
};

export default BookItem;
