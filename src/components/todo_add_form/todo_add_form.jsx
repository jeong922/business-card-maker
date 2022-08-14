import React from 'react';
import { useRef } from 'react';
import { v4 as uuidv4 } from 'uuid';
import Button from '../button/button';
import styles from './todo_add._form.module.css';

const TodoAddForm = ({ setNewTodo, addTodo }) => {
  const formRef = useRef();
  const startRef = useRef();
  const endRef = useRef();
  const textRef = useRef();

  const onSubmit = (e) => {
    e.preventDefault();
    const todo = {
      id: uuidv4(),
      text: textRef.current.value || '',
      start: startRef.current.value || '',
      end: endRef.current.value || '',
    };
    formRef.current.reset();
    addTodo(todo);
    setNewTodo(false);
  };

  const onClose = (e) => {
    if (e.target === e.currentTarget) {
      setNewTodo(false);
    }
  };

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.container}>
        <form ref={formRef} className={styles.form} onSubmit={onSubmit}>
          <div className={styles.inputWrapper}>
            <span className={styles.span}>START</span>
            <input ref={startRef} className={styles.input} type="date" />
          </div>
          <div className={styles.inputWrapper}>
            <span className={styles.span}>END</span>
            <input ref={endRef} className={styles.input} type="date" />
          </div>
          <div className={styles.inputWrapper}>
            <span className={styles.span}>TODO</span>
            <input
              ref={textRef}
              className={`${styles.input} ${styles.todo}`}
              type="text"
              placeholder="todo"
            />
          </div>

          <Button name="Add" onClick={onSubmit} />
        </form>
      </div>
    </div>
  );
};

export default TodoAddForm;
