import React, { memo } from 'react';
import styles from './todo.module.css';

const Todo = memo(({ todo, setId, setEditTodo, deleteTodo }) => {
  const { text, start, end } = todo;

  console.log('Todo', todo);

  const onClick = () => {
    setEditTodo(true);
    setId(todo.id);
  };

  const onSubmit = () => {
    deleteTodo(todo);
  };

  return (
    <li className={styles.todo}>
      <button className={styles.edit} onClick={onClick}>
        <i className="fas fa-pen"></i>
      </button>
      <button className={styles.delete} onClick={onSubmit}>
        <i className="fas fa-times"></i>
      </button>
      <div className={styles.container}>
        <p className={styles.text}>{text}</p>
        {(start || end) && (
          <div className={styles.schedule}>
            <i className={`${'far fa-calendar-alt'} ${styles.date}`}></i>
            <span className={styles.date}>{start}</span>
            <span className={styles.date}>~</span>
            <span className={styles.date}>{end}</span>
          </div>
        )}
      </div>
    </li>
  );
});

export default Todo;
