import React, { useCallback } from 'react';
import Footer from '../footer/footer';
import Menu from '../menu/menu';
import styles from './todo.module.css';
import PageTitle from '../page_title/page_title';

const Todo = ({ authService }) => {
  const onLogout = useCallback(() => {
    authService.logout();
  }, [authService]);

  return (
    <>
      <Menu onLogout={onLogout} />
      <section className={styles.todo}>
        <PageTitle title="Todo" />
        <div className={styles.container}></div>
        <Footer />
      </section>
    </>
  );
};

export default Todo;
