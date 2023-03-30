import React, { useRef, useState } from 'react'
import { NavLink } from 'react-router-dom';
import '../assets/css/Login.css';

export const Login = ({ user, setUser }) => {

  const [notFound, setNotFound] = useState(false);

  const email = useRef();
  const password = useRef();

  const validateUser = async e => {
    e.preventDefault();

    const userResult = await fetch('https://reqres.in/api/users?per_page=100');
    let userData = await userResult.json();

    const currentEmail = email.current.value;
    const currentPassword = password.current.value;

    let userFound = userData.data.filter(user => user.email === currentEmail /*&& user.password === currentPassword*/);
    userFound = userFound[0];

    if (userFound) {
      localStorage.setItem('user', JSON.stringify(userFound));

      setUser(userFound);
      setNotFound(false);
    } else {
      setNotFound(true);
    }
  }

  return (
    <div className='login-form'>
      <h2>Login</h2>
      <form onSubmit={validateUser}>
        <input name='email' ref={email} />
        <input name='password' ref={password} />
        <input type='submit' value='Send' />
        {notFound && <div>User not found</div>}
      </form>
      <NavLink to='/register'>Register</NavLink>
    </div>
  )
}
