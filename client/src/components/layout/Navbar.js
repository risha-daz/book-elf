import React, { useContext, Fragment, useState } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import BookElf from "../../book-elf.svg";
import { ReactComponent as MyIcon } from "../../ic_system_icon_24px2.svg";
import AuthContext from "../../context/auth/authContext";
import BookContext from "../../context/book/bookContext";
import {
  AppBar,
  Toolbar,
  Typography,
  Avatar,
  IconButton,
  Box,
  Button,
  Icon,
  Breadcrumbs,
} from "@material-ui/core";
import Settings from "./Settings";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
  LinkColor: {
    textColor: "#ffffff",
    textEmphasisColor: "#eeeeee",
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
  },
}));

const Navbar = ({ title }) => {
  const classes = useStyles();
  const authContext = useContext(AuthContext);
  const bookContext = useContext(BookContext);

  const { user, isAuthenticated, logout } = authContext;
  const onLogout = () => {
    logout();
    bookContext.clearBooks();
  };
  const notGuest = (
    <Fragment>
      <Box display={{ xs: "none", sm: "inline" }}>
        Welcome {user && user.name + "!  "}{" "}
      </Box>
      <Settings />
    </Fragment>
  );
  const guest = (
    <Breadcrumbs>
      <Link to='/about'>About Us</Link>
      <Link to='/register' color='inherit'>
        Register
      </Link>
      <Link to='/login'>Login</Link>
    </Breadcrumbs>
  );
  return (
    <AppBar position='static' className={classes.appBar}>
      <Toolbar>
        <IconButton
          edge='start'
          className={classes.menuButton}
          color='inherit'
          aria-label='menu'
        >
          <Link to='/'>
            <img src={BookElf} style={{ height: "40px", width: "40px" }} />
          </Link>
        </IconButton>

        <Typography variant='h5' className={classes.title}>
          {title}
        </Typography>

        <Box>{isAuthenticated ? notGuest : guest}</Box>
      </Toolbar>
    </AppBar>
  );
};

Navbar.propTypes = {
  title: PropTypes.string.isRequired,
};
Navbar.defaultProps = {
  title: "BookElf",
};
export default Navbar;
