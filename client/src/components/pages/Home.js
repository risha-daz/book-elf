import React, { useContext, useEffect } from "react";
import Booklist from "../layout/books/Booklist";
import Bookform from "../layout/books/Bookform";
import Bookfilter from "../layout/books/Bookfilter";
import AuthContext from "../../context/auth/authContext";

const Home = () => {
  const authContext = useContext(AuthContext);
  const { loadUser } = authContext;
  useEffect(() => {
    loadUser();
    //eslint-disable-next-line
  }, []);
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
