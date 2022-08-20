import React from "react";
import { useCallback } from "react";
import styles from "./theme_button.module.css";

const ThemeButton = ({ isDark, setIsDark }) => {
  const onClick = useCallback(() => {
    if (isDark === "dark") {
      setIsDark("light");
      localStorage.setItem("mytheme", "ligth");
    } else {
      setIsDark("dark");
      localStorage.setItem("mytheme", "dark");
    }
  }, [isDark, setIsDark]);

  const theme = isDark === "dark" ? styles.dark : styles.light;

  return (
    <button className={`${styles.wrapper} ${theme}`} onClick={onClick}>
      <div className={`${styles.button} ${theme}`}></div>
    </button>
  );
};

export default ThemeButton;
