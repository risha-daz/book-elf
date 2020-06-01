import React, { useState, useContext, useEffect } from "react";
import AuthContext from "../../../context/auth/authContext";
import AlertContext from "../../../context/alert/alertContext";

const Register = (props) => {
  const authContext = useContext(AuthContext);
  const alertContext = useContext(AlertContext);
  const { registerUser, errors, removeErrors, isAuthenticated } = authContext;

  useEffect(() => {
    if (isAuthenticated) {
      props.history.push("/"); //redirect
    }
    if (
      errors === "User already exists" ||
      errors === "Please enter a valid email"
    ) {
      alertContext.setAlert(errors, "danger");
      removeErrors();
    }
    //eslint-disable-next-line
  }, [errors, isAuthenticated, props.history]);

  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
    password2: "",
  });
  const { name, email, password, password2 } = user;

  const onChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    if (password !== password2) {
      alertContext.setAlert("Passwords do not match", "danger");
    } else {
      registerUser({ name, email, password });
    }
  };

  return (
    <div className='form-container'>
      <h1>
        Account <span className='text-primary'> Register</span>{" "}
      </h1>
      <form onSubmit={onSubmit}>
        <div className='form-group'>
          <label htmlFor='name'>Name</label>
          <input
            type='text'
            name='name'
            placeholder='Name...'
            value={name}
            onChange={onChange}
            required
          />
        </div>
        <div className='form-group'>
          <label htmlFor='email'>Email</label>
          <input
            type='email'
            name='email'
            placeholder='Email...'
            value={email}
            onChange={onChange}
            required
          />
        </div>
        <div className='form-group'>
          <label htmlFor='password'>Password</label>
          <input
            type='password'
            name='password'
            placeholder='Password...'
            value={password}
            onChange={onChange}
            minLength='6'
            required
          />
        </div>
        <div className='form-group'>
          <label htmlFor='password2'>Confirm Password</label>
          <input
            type='password'
            name='password2'
            placeholder='Re enter password...'
            value={password2}
            onChange={onChange}
            minLength='6'
            required
          />
        </div>
        <input
          type='submit'
          value='Register'
          className='btn btn-primary btn-block'
        />
      </form>
    </div>
  );
};

export default Register;
