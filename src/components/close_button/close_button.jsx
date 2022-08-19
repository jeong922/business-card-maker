import React from "react";
import styles from "./close_button.module.css";

const CloseButton = ({ onClick }) => {
  return (
    <button className={styles.button} onClick={onClick}>
      <i className="fas fa-times"></i>
    </button>
  );
};

export default CloseButton;
