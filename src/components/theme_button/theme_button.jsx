import React from "react";
import { useState } from "react";
import styles from "./theme_button.module.css";

const ThemeButton = () => {
  const [isClick, setIsClick] = useState(false);

  return (
    <button className={styles.wrapper}>
      <div className={styles.button}></div>
    </button>
  );
};

export default ThemeButton;
