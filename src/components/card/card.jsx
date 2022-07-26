import React from 'react';
import styles from './card.module.css';

const DEFAULT_IMAGE = '/images/default_logo.png';
const Card = ({ card }) => {
  const { name, theme, company, title, email, message, fileName, fileURL } =
    card;
  const url = fileURL || DEFAULT_IMAGE;

  return (
    <li className={`${styles.card} ${getStyles(theme)}`}>
      <img className={styles.avatar} src={url} alt="photo" />
      <div className={styles.info}>
        <h1 className={styles.name}>{name}</h1>
        <span className={styles.company}>{company}</span>
        <span className={styles.title}>{title}</span>
        <span className={styles.email}>{email}</span>
        <p className={styles.message}>{message}</p>
      </div>
    </li>
  );
};

function getStyles(theme) {
  switch (theme) {
    case 'dark':
      return styles.dark;
    case 'light':
      return styles.light;
    case 'colorful':
      return styles.colorful;
    default:
      throw new Error(`unknown theme: ${theme}`);
  }
}

export default Card;
