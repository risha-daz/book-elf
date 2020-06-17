import React, { Fragment } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import PrivateRoute from "./components/routing/PrivateRoute";
import Navbar from "./components/layout/Navbar";
import Alert from "./components/layout/Alert";
import Home from "./components/pages/Home";
import About from "./components/pages/About";
import Register from "./components/layout/auth/Register";
import Login from "./components/layout/auth/Login";
import View from "./components/pages/Account/View";
import Edit from "./components/pages/Account/Edit";
import AddFriends from "./components/pages/Account/AddFriends";
import BookState from "./context/book/BookState";
import AuthState from "./context/auth/AuthState";
import AlertState from "./context/alert/AlertState";
import setAuthToken from "./utils/setAuthToken";
import "./App.css";
import FriendState from "./context/friend/FriendState";

if (localStorage.token) {
  setAuthToken(localStorage.token);
}

function App() {
  return (
    <AuthState>
      <BookState>
        <FriendState>
          <AlertState>
            <Router>
              <Fragment>
                <Navbar />
                <div className='container'>
                  <Alert />
                  <Switch>
                    <PrivateRoute exact path='/' component={Home} />
                    <Route exact path='/about' component={About} />
                    <Route exact path='/register' component={Register} />
                    <Route exact path='/login' component={Login} />
                    <PrivateRoute exact path='/account/view' component={View} />
                    <PrivateRoute exact path='/account/edit' component={Edit} />
                    <PrivateRoute
                      exact
                      path='/account/friends'
                      component={AddFriends}
                    />
                  </Switch>
                </div>
              </Fragment>
            </Router>
          </AlertState>
        </FriendState>
      </BookState>
    </AuthState>
  );
}

export default App;
