import React, { useRef, useContext, useEffect } from "react";
import BookContext from "../../../context/book/bookContext";

const Bookfilter = () => {
  const bookContext = useContext(BookContext);
  const text = useRef("");
  useEffect(() => {
    if (bookContext.filter === null) {
      text.current.value = "";
    }
  });
  const onChange = (e) => {
    if (text.current.value !== "") {
      bookContext.filterBooks(e.target.value);
    } else {
      bookContext.clearFilter();
    }
  };
  return (
    <form>
      <input
        ref={text}
        type='text'
        placeholder='Filter books...'
        onChange={onChange}
      />
    </form>
  );
};

export default Bookfilter;
