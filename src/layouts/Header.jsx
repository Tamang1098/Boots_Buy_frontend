import React, { useContext } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { AuthContext } from '../auth/AuthProvider';
import './Header.css';
import logo from '../assets/logo.jpg'; // adjust path if needed

export default function Header() {
  const { user, logout } = useContext(AuthContext);

  return (
    <header className="header">
      <div className="container">
        <div className="header-logo">
          <Link to="/">
            <img src={logo} alt="Logo" />
          </Link>
        </div>
        <nav>
          <NavLink to="/">Home</NavLink>
          {!user && (
            <>
              <NavLink to="/login">Login</NavLink>
              <Link to="/register">Register</Link>
            </>
          )}
          {user && (
            <>
              <NavLink onClick={logout}>Logout</NavLink>
            </>
          )}
        </nav>
      </div>
    </header>
  );
}
