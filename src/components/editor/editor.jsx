import React, { useEffect, useState } from 'react';
import Button from '../button/button';
import CardAddForm from '../card_add_form/card_add_form';
import CardEditForm from '../card_edit_form/card_edit_form';
import styles from './editor.module.css';

const Editor = ({ cards, addCard, updateCard, deleteCard }) => {
  const [newCard, setNewCard] = useState(false);

  const onClick = () => {
    setNewCard(true);
  };

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

  return (
    <section className={styles.editor}>
      <h1 className={styles.title}>Card Maker</h1>
      <div className={styles.button}>
        <Button name="New Card" onClick={onClick} />
      </div>
      {Object.keys(cards).map((key) => (
        <CardEditForm
          key={key}
          card={cards[key]}
          updateCard={updateCard}
          deleteCard={deleteCard}
        />
      ))}
      {newCard && <CardAddForm onAdd={addCard} setNewCard={setNewCard} />}
    </section>
  );
};

export default Editor;
