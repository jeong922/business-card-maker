import { useCallback } from 'react';
import { useState } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import styles from './app.module.css';
import Login from './components/login/login';
import Maker from './components/maker/maker';
import Todos from './components/todos/todos';

function App({ FileInput, authService, cardRepository, todoRepository }) {
  const getTheme = useCallback(() => {
    const theme = localStorage.getItem('mytheme');
    if (!theme) {
      return 'light';
    } else {
      return theme;
    }
  }, []);

  const [isDark, setIsDark] = useState(getTheme);

  const theme = isDark === 'dark' ? styles.dark : styles.light;

  return (
    <div className={`${styles.app} ${theme}`}>
      <BrowserRouter basename={process.env.PUBLIC_URL}>
        <Routes>
          <Route
            path="/"
            element={<Login authService={authService} isDark={isDark} />}
          ></Route>
          <Route
            path="/maker"
            element={
              <Maker
                FileInput={FileInput}
                authService={authService}
                cardRepository={cardRepository}
                isDark={isDark}
                setIsDark={setIsDark}
              />
            }
          ></Route>
          <Route
            path="/memo"
            element={
              <Todos
                authService={authService}
                todoRepository={todoRepository}
                isDark={isDark}
                setIsDark={setIsDark}
              />
            }
          ></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
