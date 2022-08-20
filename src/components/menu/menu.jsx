import React, { memo, useEffect } from "react";
import styles from "./menu.module.css";
import { Link } from "react-router-dom";
import ThemeButton from "../theme_button/theme_button";

const Menu = ({ onLogout, show, setShow, pathName, isDark, setIsDark }) => {
  const displayType = show ? styles.show : "";
  const theme = isDark === "dark" ? styles.dark : styles.light;

  const handleResize = () => {
    if (window.innerWidth > 992) {
      setShow(false);
    }
  };

  useEffect(() => {
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  });

  const onClick = () => {
    setShow(false);
  };

  return (
    <>
      <nav className={`${styles.nav} ${displayType} ${theme}`}>
        <div className={styles.logWrapper}>
          {/* <img className={styles.logo} src="./images/logo.png" alt="logo" /> */}
          <h1 className={styles.title}>My Note</h1>
          <button className={`${styles.closeBtn} ${theme}`} onClick={onClick}>
            <i className="fas fa-times"></i>
          </button>
        </div>
        <div className={styles.theme}>
          <ThemeButton isDark={isDark} setIsDark={setIsDark} />
        </div>
        <ul className={styles.ul}>
          <Link to="/maker">
            <li className={`${styles.li} ${theme}`} onClick={onClick}>
              {pathName === "/maker" ? (
                <i className={`${"fas fa-address-card"} ${styles.icon}`}></i>
              ) : (
                <i className={`${"far fa-address-card"} ${styles.icon}`}></i>
              )}
              CARD
            </li>
          </Link>
          <Link to="/memo">
            <li className={`${styles.li} ${theme}`} onClick={onClick}>
              {pathName === "/memo" ? (
                <i className={`${"fas fa-list-alt"} ${styles.icon}`}></i>
              ) : (
                <i className={`${"far fa-list-alt"} ${styles.icon}`}></i>
              )}
              MEMO
            </li>
          </Link>
        </ul>
        <div>
          <button className={`${styles.logout} ${theme}`} onClick={onLogout}>
            Logout
          </button>
        </div>
      </nav>
    </>
  );
};

export default memo(Menu);
