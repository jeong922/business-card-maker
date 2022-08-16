import React, { memo, useEffect } from 'react';
import styles from './menu.module.css';
import { Link } from 'react-router-dom';

const Menu = ({ onLogout, show, setShow, pathName }) => {
  const displayType = show ? styles.show : '';

  const handleResize = () => {
    if (window.innerWidth > 992) {
      setShow(false);
    }
  };

  useEffect(() => {
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  });

  const onClick = () => {
    setShow(false);
  };

  return (
    <>
      <nav className={`${styles.nav} ${displayType}`}>
        <div className={styles.logWrapper}>
          {/* <img className={styles.logo} src="./images/logo.png" alt="logo" /> */}
          <h1 className={styles.title}>Business Card Maker</h1>
          <button className={styles.closeBtn} onClick={onClick}>
            <i className="fas fa-times"></i>
          </button>
        </div>
        <ul className={styles.ul}>
          <Link to="/maker">
            <li className={styles.li} onClick={onClick}>
              {pathName === '/maker' ? (
                <i className={`${'fas fa-address-card'} ${styles.icon}`}></i>
              ) : (
                <i className={`${'far fa-address-card'} ${styles.icon}`}></i>
              )}
              CARD
            </li>
          </Link>
          <Link to="/memo">
            <li className={styles.li} onClick={onClick}>
              {pathName === '/memo' ? (
                <i className={`${'fas fa-list-alt'} ${styles.icon}`}></i>
              ) : (
                <i className={`${'far fa-list-alt'} ${styles.icon}`}></i>
              )}
              MEMO
            </li>
          </Link>
        </ul>
        <div>
          <button className={styles.logout} onClick={onLogout}>
            Logout
          </button>
        </div>
      </nav>
    </>
  );
};

export default memo(Menu);
