import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { TStore, useAppDispatch } from '../store';
import { logout } from '../slices/authSlice';


function Header() {
  const location = useLocation();
  const HOME = '/';
  const { userToken } = useSelector((state: TStore) => state.user);
  const dispatch = useAppDispatch();

  return (
    <section className="header">
      <div className="logo">Logo</div>
      <nav className="user-nav">
          <div className="user-nav__user">
            <img src="/logo192.png" alt="User photo" className="user-nav__user-photo" />
            {userToken ? 
              <Link 
                className="user-nav__login" 
                to="/login" 
                onClick={() => dispatch(logout())}>
                  Sign Out
              </Link>
              : <Link className="user-nav__login" to="/login">Log In</Link>
            } 
            {/* <span className="user-nav__user-name">Jonas</span> */}
          </div>
      </nav>
    </section>
  );
}

export default Header;
