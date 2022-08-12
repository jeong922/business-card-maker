import React, { useCallback, useEffect, useState } from 'react';
import Menu from '../menu/menu';
import styles from './todo.module.css';
import PageTitle from '../page_title/page_title';
import Footer from '../footer/footer';
import { useLocation } from 'react-router-dom';

const Todo = ({ authService }) => {
  const location = useLocation();
  const pathName = location.pathname;
  const [show, setShow] = useState(false);
  const [menuBtn, setMenuBtn] = useState(false);
  const onLogout = useCallback(() => {
    authService.logout();
  }, [authService]);

  const handleResize = () => {
    window.innerWidth > 992 ? setMenuBtn(false) : setMenuBtn(true);
  };

  useEffect(() => {
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const onClick = () => {
    setShow(true);
  };

  return (
    <>
      <Menu
        onLogout={onLogout}
        show={show}
        setShow={setShow}
        pathName={pathName}
      />
      <section className={styles.todo}>
        <div className={styles.top}>
          <PageTitle title="Todo" />
          {menuBtn && (
            <button className={styles.menuBtn} onClick={onClick}>
              <i className="fas fa-bars"></i>
            </button>
          )}
        </div>
        <div className={styles.container}></div>
        <Footer />
      </section>
    </>
  );
};

export default Todo;
