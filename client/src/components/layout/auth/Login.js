import React, { useState, useContext } from "react";
import AuthContext from "../../../context/auth/authContext";
const Login = () => {
  const authContext = useContext(AuthContext);
  const [user, setUser] = useState({
    email: "",
    password: "",
  });
  const { errors, loginUser } = authContext;

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
        Account <span class='text-primary'> Login</span>{" "}
      </h1>
      <form onSubmit={onSubmit}>
        <div className='form-group'>
          <label htmlFor='email'>Name</label>
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
            type='text'
            name='password'
            placeholder='Password...'
            value={password}
            onChange={onChange}
            required
          />
        </div>

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
