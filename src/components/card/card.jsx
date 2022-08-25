import React, { memo } from 'react';
import styles from './card.module.css';

const DEFAULT_IMAGE = '/images/default2.jpg';
const Card = memo(({ card, setEditCard, setId, deleteCard }) => {
  const { name, theme, company, title, email, message, fileURL } = card;
  const url = fileURL || process.env.PUBLIC_URL + DEFAULT_IMAGE;

  const onClick = () => {
    setEditCard(true);
    setId(card.id);
  };

  const onSubmit = () => {
    deleteCard(card);
  };

  return (
    <li className={`${styles.card} ${getStyles(theme)}`}>
      <button className={styles.delete} onClick={onSubmit}>
        <i className="fas fa-times"></i>
      </button>
      <img className={styles.avatar} src={url} alt="profile" />
      <div className={styles.info}>
        <div className={styles.wrapper}>
          <h1 className={styles.name}>{name}</h1>
          <button className={styles.edit} onClick={onClick}>
            <i className="fas fa-pen"></i>
          </button>
        </div>
        <span className={styles.company}>{company}</span>
        <span className={styles.title}>{title}</span>
        <span className={styles.email}>{email}</span>
        <p className={styles.message}>{message}</p>
      </div>
    </li>
  );
});

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
