import React, { useContext } from "react";
import BookContext from "../../context/book/bookContext";
import books2 from "../layout/books2.png";

const Book = ({ match, params }) => {
  const bookContext = useContext(BookContext);
  let title = false;
  let genre = null;
  let author = null;
  let description = null;
  let rating = null;
  console.log(bookContext.current);
  return (
    <div>
      <img
        src={books2}
        className='round-img'
        style={{ width: "200px", height: "200px" }}
      />
      {title && <h2>{title}</h2>}
    </div>
  );
};

export default Book;
