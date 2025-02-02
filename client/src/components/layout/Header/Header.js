import React, { useContext } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { AuthContext } from '../../../context/AuthContext';
import { useAuth } from '../../../hooks/useAuth';
import styles from './Header.module.css';

const Header = () => {
  const { user } = useContext(AuthContext);
  const { logout } = useAuth();
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  return (
    <header className={styles.header}>
      <nav className={styles.nav}>
        <Link to="/" className={styles.logo}>
          Property Listing
        </Link>
        <div className={styles.navLinks}>
          <Link
            to="/"
            className={`${styles.navLink} ${isActive('/') ? styles.activeLink : ''}`}
          >
            Home
          </Link>
          {user ? (
            <>
              <Link
                to="/add-property"
                className={`${styles.navLink} ${isActive('/add-property') ? styles.activeLink : ''}`}
              >
                Add Property
              </Link>
              <button
                onClick={logout}
                className={styles.navLink}
                style={{ border: 'none', background: 'none', cursor: 'pointer' }}
              >
                Logout
              </button>
            </>
          ) : (
            <Link
              to="/login"
              className={`${styles.navLink} ${isActive('/login') ? styles.activeLink : ''}`}
            >
              Login
            </Link>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Header;
