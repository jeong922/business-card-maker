import React, { useCallback, useEffect, useState } from 'react';
import Menu from '../menu/menu';
import styles from './todos.module.css';
import PageTitle from '../page_title/page_title';
import Footer from '../footer/footer';
import { useLocation, useNavigate } from 'react-router-dom';
import Todo from '../todo/todo';
import TodoAddForm from '../todo_add_form/todo_add_form';
import TodoEditForm from '../todo_edit_form/todo_edit_form';
import AddButton from '../add_button/add_button';

const Todos = ({ authService, todoRepository }) => {
  const location = useLocation();
  const locationState = location?.state;
  const pathName = location.pathname;
  const navigate = useNavigate();
  const [userId, setUserId] = useState(locationState && locationState.id);
  const [todos, setTodos] = useState({});
  const [show, setShow] = useState(false);
  const [menuBtn, setMenuBtn] = useState(false);
  const [id, setId] = useState('');
  const [newTodo, setNewTodo] = useState(false);
  const [editTodo, setEditTodo] = useState(false);

  const onLogout = useCallback(() => {
    authService.logout();
  }, [authService]);

  useEffect(() => {
    if (!userId) {
      return;
    }
    const stopSync = todoRepository.syncItems(
      userId,
      (todos) => {
        setTodos(todos);
      },
      'todos'
    );
    return () => stopSync();
  }, [userId, todoRepository]);

  useEffect(() => {
    authService.onAuthChange((user) => {
      if (user) {
        setUserId(user.uid);
      } else {
        navigate('/');
      }
    });
  }, [authService, userId, navigate]);

  const createOrUpdateTodo = (todo) => {
    setTodos((todos) => {
      const updated = { ...todos };
      updated[todo.id] = todo;
      return updated;
    });
    todoRepository.saveItem(userId, todo, 'todos');
  };

  const deleteTodo = (todo) => {
    setTodos((todos) => {
      const updated = { ...todos };
      delete updated[todo.id];
      return updated;
    });
    todoRepository.removeItem(userId, todo, 'todos');
  };

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

  const makeTodo = () => {
    setNewTodo(true);
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
        <div className={styles.container}>
          <AddButton onClick={makeTodo} />
          <ul className={styles.todos}>
            {Object.keys(todos).map((key) => (
              <Todo
                key={key}
                todo={todos[key]}
                setId={setId}
                setEditTodo={setEditTodo}
                deleteTodo={deleteTodo}
              />
            ))}
          </ul>
          {newTodo && (
            <TodoAddForm setNewTodo={setNewTodo} addTodo={createOrUpdateTodo} />
          )}
          {editTodo && (
            <TodoEditForm
              todo={todos[id]}
              updateTodo={createOrUpdateTodo}
              setEditTodo={setEditTodo}
            />
          )}
        </div>
        <Footer />
      </section>
    </>
  );
};

export default Todos;
