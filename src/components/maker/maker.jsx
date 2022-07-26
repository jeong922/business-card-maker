import React, { useEffect, useState } from 'react';
import Footer from '../footer/footer';
import Header from '../header/header';
import styles from './maker.module.css';
import { useNavigate } from 'react-router-dom';
import Editor from '../editor/editor';
import Preview from '../preview/preview';

const Maker = ({ authService }) => {
  const navigate = useNavigate();
  const [cards, setCards] = useState({
    1: {
      id: '1',
      name: 'jeong',
      theme: 'light',
      company: 'company',
      title: 'engineer',
      email: 'jeong@gmail.com',
      message: 'ssss',
      fileName: 'aaa',
      fileURL: null,
    },
    2: {
      id: '2',
      name: 'jeong',
      theme: 'dark',
      company: 'company',
      title: 'engineer',
      email: 'jeong@gmail.com',
      message: 'ssss',
      fileName: 'aaa',
      fileURL: 'aaa.png',
    },
    3: {
      id: '3',
      name: 'jeong',
      theme: 'colorful',
      company: 'company',
      title: 'engineer',
      email: 'jeong@gmail.com',
      message: 'ssss',
      fileName: 'aaa',
      fileURL: null,
    },
  });

  const onLogout = () => {
    authService.logout();
  };

  useEffect(() => {
    authService.onAuthChange((user) => {
      if (!user) {
        navigate('/');
      }
    });
  });

  const createOrUpdateCard = (card) => {
    setCards((cards) => {
      const updated = { ...cards };
      updated[card.id] = card;
      return updated;
    });
  };

  const deleteCard = (card) => {
    setCards((cards) => {
      const updated = { ...cards };
      delete updated[card.id];
      return updated;
    });
  };

  return (
    <section className={styles.maker}>
      <Header onLogout={onLogout} />
      <div className={styles.container}>
        <Editor
          cards={cards}
          addCard={createOrUpdateCard}
          updateCard={createOrUpdateCard}
          deleteCard={deleteCard}
        />
        <Preview cards={cards} />
      </div>
      <Footer />
    </section>
  );
};

export default Maker;
