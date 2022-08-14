import React, { useEffect, useState } from 'react';
import Card from '../card/card';
import CardAddForm from '../card_add_form/card_add_form';
import CardEditForm from '../card_edit_form/card_edit_form';
import styles from './preview.module.css';

const Preview = ({ FileInput, cards, addCard, updateCard, deleteCard }) => {
  const [newCard, setNewCard] = useState(false);
  const [editCard, setEditCard] = useState(false);
  const [id, setId] = useState('');

  const onClick = () => {
    setNewCard(true);
  };

  useEffect(() => {
    if (newCard) {
      document.body.style.cssText = `
    position: fixed; 
    top: -${window.pageYOffset}px;
    overflow-y: scroll;
    width: 100%;`;

      return () => {
        const scrollY = document.body.style.top;
        document.body.style.cssText = '';
        window.scrollTo(0, parseInt(scrollY || '0', 10) * -1);
      };
    }
  }, [newCard]);

  return (
    <section className={styles.preview}>
      <div className={styles.button}>
        <button className={styles.newCardBtn} onClick={onClick}>
          {/* New Card */}
          <i className="fas fa-plus"></i>
        </button>
      </div>
      <ul className={styles.cards}>
        {Object.keys(cards).map((key) => (
          <Card
            key={key}
            card={cards[key]}
            setId={setId}
            setEditCard={setEditCard}
            deleteCard={deleteCard}
          />
        ))}
      </ul>

      {newCard && (
        <CardAddForm
          FileInput={FileInput}
          onAdd={addCard}
          setNewCard={setNewCard}
        />
      )}

      {editCard && (
        <CardEditForm
          FileInput={FileInput}
          card={cards[id]}
          updateCard={updateCard}
          setEditCard={setEditCard}
        />
      )}
    </section>
  );
};

export default Preview;
