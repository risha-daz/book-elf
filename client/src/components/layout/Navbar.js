import React, { useContext, Fragment } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import AuthContext from "../../context/auth/authContext";
import BookContext from "../../context/book/bookContext";

const Navbar = ({ title, icon }) => {
  const authContext = useContext(AuthContext);
  const bookContext = useContext(BookContext);
  const { user, isAuthenticated, logout } = authContext;
  const onLogout = () => {
    logout();
    bookContext.clearBooks();
  };
  const notGuest = (
    <Fragment>
      {/*<li>        <Link to='/about'>About Us</Link> |      </li>*/}
      <li>Welcome {user && user.name + "!  "} </li>
      <li>
        <a href='#!' onClick={onLogout}>
          <i className='fas fa-sign-out-alt'></i>
          <span className='hide-sm'> Logout </span>
        </a>
      </li>
    </Fragment>
  );
  const guest = (
    <Fragment>
      <li>
        <Link to='/about'>About Us</Link> |
      </li>
      <li>
        <Link to='/register'>Register</Link>|
      </li>
      <li>
        <Link to='/login'>Login</Link>
      </li>
    </Fragment>
  );
  return (
    <div className='navbar bg-primary'>
      <h1>
        <Link to='/'>
          <i className={icon} /> {title}
        </Link>
      </h1>
      <ul>{isAuthenticated ? notGuest : guest}</ul>
    </div>
  );
};

Navbar.propTypes = {
  title: PropTypes.string.isRequired,
  icon: PropTypes.string,
};
Navbar.defaultProps = {
  title: "Book Keeper",
  icon: "fas fa-book",
};
export default Navbar;
