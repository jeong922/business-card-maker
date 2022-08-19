import React from "react";
import styles from "./theme_button.module.css";

const ThemeButton = ({ isDark, setIsDark }) => {
  const onClick = () => {
    isDark ? setIsDark(false) : setIsDark(true);
  };

  const theme = isDark ? styles.dark : styles.light;

  return (
    <button className={`${styles.wrapper} ${theme}`} onClick={onClick}>
      <div className={`${styles.button} ${theme}`}></div>
    </button>
  );
};

export default ThemeButton;
