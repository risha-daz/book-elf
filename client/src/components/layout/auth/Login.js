import React, { useState, useContext, useEffect } from "react";
import AuthContext from "../../../context/auth/authContext";
import AlertContext from "../../../context/alert/alertContext";
import { TextField, FormGroup, InputLabel } from "@material-ui/core";
const Login = (props) => {
  const authContext = useContext(AuthContext);
  const alertContext = useContext(AlertContext);

  const { errors, loginUser, removeErrors, isAuthenticated } = authContext;

  useEffect(() => {
    if (isAuthenticated) {
      props.history.push("/"); //redirect
    }
    if (
      errors === "User does not exist" ||
      errors === "Incorrect password" ||
      errors === "Please enter a valid email"
    ) {
      alertContext.setAlert(errors, "danger");
      removeErrors();
    }
    //eslint-disable-next-line
  }, [errors, isAuthenticated, props.history]);

  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const { email, password } = user;

  const onChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    loginUser({ email, password });
  };

  return (
    <div className='form-container'>
      <h1>
        Account <span className='text-primary'> Login</span>{" "}
      </h1>
      <form onSubmit={onSubmit}>
        <FormGroup>
          <InputLabel htmlFor='email'>Email</InputLabel>
          <TextField
            type='email'
            name='email'
            value={email}
            onChange={onChange}
            required
            variant='filled'
          />
        </FormGroup>
        <FormGroup>
          <InputLabel htmlFor='password'>Password</InputLabel>
          <TextField
            type='password'
            name='password'
            value={password}
            onChange={onChange}
            required
            variant='filled'
          />
        </FormGroup>
        <input
          type='submit'
          value='Login'
          className='btn btn-primary btn-block'
        />
      </form>
    </div>
  );
};

export default Login;
