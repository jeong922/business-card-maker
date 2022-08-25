import React, { memo } from 'react';
import styles from './card.module.css';

// const DEFAULT_IMAGE = '/images/default_logo.png';
const Card = memo(({ card, setEditCard, setId, deleteCard }) => {
  const { name, theme, company, title, email, message, fileURL } = card;

  console.log(selectImage());
  const url = fileURL || process.env.PUBLIC_URL + selectImage();

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

function selectImage() {
  const images = [
    '/images/default_logo.png',
    '/images/default1.jpg',
    '/images/default2.jpg',
  ];
  return images[Math.floor(Math.random() * images.length)];
}

export default Card;
