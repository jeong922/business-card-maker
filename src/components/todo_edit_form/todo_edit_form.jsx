import React from 'react';
import CloseButton from '../close_button/close_button';
import styles from './todo_edit_form.module.css';

const TodoEditForm = ({ todo, updateTodo, setEditTodo, isDark }) => {
  const { text, start, end } = todo;

  const themeType = isDark === 'dark' ? styles.dark : styles.light;

  const onChange = (e) => {
    if (e.currentTarget == null) {
      return;
    }
    e.preventDefault();
    updateTodo({
      ...todo,
      [e.currentTarget.name]: e.currentTarget.value,
    });
  };

  const onClose = (e) => {
    if (e.target === e.currentTarget) {
      setEditTodo(false);
    }
  };

  const onClickCloseBtn = () => {
    setEditTodo(false);
  };

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={`${styles.container} ${themeType}`}>
        <CloseButton onClick={onClickCloseBtn} />
        <form className={styles.form}>
          <div className={styles.inputWrapper}>
            <span className={styles.span}>START</span>
            <input
              className={styles.input}
              name="start"
              type="date"
              onChange={onChange}
              value={start}
            />
          </div>
          <div className={styles.inputWrapper}>
            <span className={styles.span}>END</span>
            <input
              className={styles.input}
              name="end"
              type="date"
              onChange={onChange}
              value={end}
            />
          </div>
          <div className={styles.inputWrapper}>
            <span className={styles.span}>TODO</span>
            <textarea
              className={`${styles.input} ${styles.text} ${styles.todo}`}
              name="text"
              value={text}
              placeholder="todo"
              onChange={onChange}
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default TodoEditForm;
