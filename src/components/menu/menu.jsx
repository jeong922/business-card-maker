import React, { memo } from 'react';
import styles from './menu.module.css';
import { Link, useLocation } from 'react-router-dom';

const Menu = ({ onLogout }) => {
  const location = useLocation();
  const pathName = location.pathname;
  return (
    <nav className={styles.nav}>
      <div className={styles.logWrapper}>
        {/* <img className={styles.logo} src="./images/logo.png" alt="logo" /> */}
        <h1 className={styles.title}>Business Card Maker</h1>
      </div>
      <ul className={styles.ul}>
        <Link to="/maker">
          <li className={styles.li}>
            {pathName === '/maker' ? (
              <i className={`${'fas fa-address-card'} ${styles.icon}`}></i>
            ) : (
              <i className={`${'far fa-address-card'} ${styles.icon}`}></i>
            )}
            Card
          </li>
        </Link>
        <Link to="/todo">
          <li className={styles.li}>
            {pathName === '/todo' ? (
              <i className={`${'fas fa-list-alt'} ${styles.icon}`}></i>
            ) : (
              <i className={`${'far fa-list-alt'} ${styles.icon}`}></i>
            )}
            ToDo
          </li>
        </Link>
      </ul>
      <div>
        <button className={styles.logout} onClick={onLogout}>
          Logout
        </button>
      </div>
    </nav>
  );
};

export default memo(Menu);
