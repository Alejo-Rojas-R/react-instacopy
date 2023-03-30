import React from 'react'
import { NavLink } from 'react-router-dom';

export const Menu = ({ user, setUser }) => {

    const logout = () => {
        localStorage.removeItem('user');
        setUser({});
    }

    return (
        <div className='menu'>
            <div className='menu__logo'>
                <NavLink to='/'>Instacopy</NavLink>
            </div>
            {Object.keys(user).length > 0 ?
                <>
                    <div className='menu__item'>
                        <NavLink to={`/profile/${user.id}`}>Profile</NavLink>
                    </div>
                    <div className='menu__item' onClick={logout}>Logout</div>
                </>
                :
                <>
                    <div className='menu__item'>
                        <NavLink to='/login'>Login</NavLink>
                    </div>
                </>
            }
        </div>
    )
}
