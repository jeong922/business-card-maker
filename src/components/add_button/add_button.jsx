import React from 'react';
import styles from './add_button.module.css';

const AddButton = ({ onClick }) => {
  return (
    <button className={styles.button} onClick={onClick}>
      <i className="fas fa-plus"></i>
    </button>
  );
};

export default AddButton;
