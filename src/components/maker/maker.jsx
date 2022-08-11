import React, { useCallback, useEffect, useState } from 'react';
import Footer from '../footer/footer';
import styles from './maker.module.css';
import { useLocation, useNavigate } from 'react-router-dom';
import Editor from '../editor/editor';
import Preview from '../preview/preview';
import Menu from '../menu/menu';
import PageTitle from '../page_title/page_title';

const Maker = ({ FileInput, authService, cardRepository }) => {
  const location = useLocation();
  const locationState = location?.state;
  const navigate = useNavigate();
  const [cards, setCards] = useState({});
  const [userId, setUserId] = useState(locationState && locationState.id);

  const onLogout = useCallback(() => {
    authService.logout();
  }, [authService]);

  useEffect(() => {
    if (!userId) {
      return;
    }
    const stopSync = cardRepository.syncCards(userId, (cards) => {
      setCards(cards);
    });
    return () => stopSync();
  }, [userId, cardRepository]);

  useEffect(() => {
    authService.onAuthChange((user) => {
      if (user) {
        setUserId(user.uid);
      } else {
        navigate('/');
      }
    });
  }, [authService, userId, navigate]);

  const createOrUpdateCard = (card) => {
    setCards((cards) => {
      const updated = { ...cards };
      updated[card.id] = card;
      return updated;
    });
    cardRepository.saveCard(userId, card);
  };

  const deleteCard = (card) => {
    setCards((cards) => {
      const updated = { ...cards };
      delete updated[card.id];
      return updated;
    });
    cardRepository.removeCard(userId, card);
  };

  return (
    <>
      <Menu onLogout={onLogout} />
      <section className={styles.maker}>
        <PageTitle title="Card" />
        <div className={styles.container}>
          <Editor
            FileInput={FileInput}
            cards={cards}
            addCard={createOrUpdateCard}
            updateCard={createOrUpdateCard}
            deleteCard={deleteCard}
          />
          <Preview cards={cards} />
        </div>
        <Footer />
      </section>
    </>
  );
};

export default Maker;
