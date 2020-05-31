import React from "react";
import Booklist from "../layout/books/Booklist";
import Bookform from "../layout/books/Bookform";
import Bookfilter from "../layout/books/Bookfilter";

const Home = () => {
  return (
    <div className='grid-2'>
      <div>
        <Bookform />
      </div>
      <div>
        <Bookfilter />
        <Booklist />
      </div>
    </div>
  );
};

export default Home;
