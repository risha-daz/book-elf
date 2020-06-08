import React, { useContext } from "react";
import BookContext from "../../context/book/bookContext";

import books2 from "../layout/books2.png";

const Book = () => {
  const bookContext = useContext(BookContext);
  const { clearBookpage } = bookContext;
  const clear = (e) => {
    e.preventDefault();
    clearBookpage();
  };
  if (bookContext.bookpage) {
    const { title, author, description, genre, rating } = bookContext.bookpage;
    return (
      <div className='grid-3-2'>
        <div>
          <div className='grid-2'>
            <div>
              <button className='btn btn-light btn-block' onClick={clear}>
                Close Detailed view
              </button>
              <img
                src={books2}
                className='round-img'
                style={{ width: "200px", height: "200px" }}
              />
            </div>
            <div>
              {title && <h2>{title}</h2>}
              {genre && <h2>{genre}</h2>}
              {author && <h3>{author}</h3>}
            </div>
          </div>

          <div className='card bg-light'>
            {rating && <h3>{rating}</h3>}
            {description && <p>{description}</p>}
          </div>
        </div>
        <div className='card bg-light'>Recommended By: Recommended To:</div>
      </div>
    );
  } else {
    return <div></div>;
  }
};

export default Book;
