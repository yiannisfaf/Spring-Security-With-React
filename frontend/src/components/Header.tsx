import React from 'react';
import { Link, useLocation } from 'react-router-dom';


function Header() {
  const location = useLocation();
  const HOME = '/';
  const TABLE = '/table';

  return (
    <section className="header">
      <div className="logo">Logo</div>
      <nav className="user-nav">
          <div className="user-nav__user">
            <img src="/logo192.png" alt="User photo" className="user-nav__user-photo" />
            <Link className="user-nav__login" to="/login">Log In</Link>
            {/* <span className="user-nav__user-name">Jonas</span> */}
          </div>
      </nav>
    </section>
  );
}

export default Header;
