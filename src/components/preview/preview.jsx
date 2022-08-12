import React, { useEffect, useState } from 'react';
import Button from '../button/button';
import Card from '../card/card';
import CardAddForm from '../card_add_form/card_add_form';
import CardEditForm from '../card_edit_form/card_edit_form';
import styles from './preview.module.css';

const Preview = ({ FileInput, cards, addCard, updateCard, deleteCard }) => {
  const [newCard, setNewCard] = useState(false);
  const [editCard, setEditCard] = useState(false);
  const [id, setId] = useState('');

  useEffect(() => {
    if (newCard) {
      document.body.style.cssText = `
      overflow-y: hidden;`;
    }
    return () => {
      document.body.style.cssText = `
      overflow-y: 'auto';
      `;
    };
  }, [newCard]);

  const onClick = () => {
    setNewCard(true);
  };

  return (
    <section className={styles.preview}>
      <div className={styles.button}>
        <Button name="New Card" onClick={onClick} />
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
