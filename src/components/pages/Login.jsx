import React, { useRef, useState } from 'react'
import { NavLink } from 'react-router-dom';
import '../../assets/css/Login.css';

export const Login = ({ user, setUser }) => {

  const [notFound, setNotFound] = useState(false);

  const username = useRef();
  const password = useRef();

  const validateUser = async e => {
    e.preventDefault();

    const currentUsername = username.current.value;
    const currentPassword = password.current.value;

    const userResult = await fetch(`https://dummyjson.com/users/filter?key=username&value=${currentUsername}`);
    let userData = await userResult.json();
    let userFound = false;

    if (userData.total > 0) {
      userData = userData.users[0];
      userFound = userData.password == currentPassword;
    }

    if (userFound) {
      localStorage.setItem('user', JSON.stringify(userData));

      setUser(userData);
      setNotFound(false);
    } else {
      setNotFound(true);
    }
  }

  return (
    <div className='login-form'>
      <h2>Login</h2>
      <form onSubmit={validateUser}>
        <input name='username' ref={username} />
        <input name='password' ref={password} />
        <input type='submit' value='Send' />
        {notFound && <div>User not found</div>}
      </form>
      <NavLink to='/register'>Register</NavLink>
    </div>
  )
}
