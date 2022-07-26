import React, { useEffect, useState } from 'react';
import Footer from '../footer/footer';
import Header from '../header/header';
import styles from './maker.module.css';
import { useNavigate } from 'react-router-dom';
import Editor from '../editor/editor';
import Preview from '../preview/preview';

const Maker = ({ authService }) => {
  const navigate = useNavigate();
  const [cards, setCards] = useState([
    {
      id: '1',
      name: 'jeong',
      theme: 'light',
      company: 'company',
      title: 'engineer',
      email: 'jeong@gmail.com',
      message: 'ssss',
      fileName: 'aaa',
      fileURL: null,
    },
    {
      id: '2',
      name: 'jeong',
      theme: 'dark',
      company: 'company',
      title: 'engineer',
      email: 'jeong@gmail.com',
      message: 'ssss',
      fileName: 'aaa',
      fileURL: 'aaa.png',
    },
    {
      id: '3',
      name: 'jeong',
      theme: 'colorful',
      company: 'company',
      title: 'engineer',
      email: 'jeong@gmail.com',
      message: 'ssss',
      fileName: 'aaa',
      fileURL: null,
    },
  ]);
  const onLogout = () => {
    authService.logout();
  };

  useEffect(() => {
    authService.onAuthChange((user) => {
      if (!user) {
        navigate('/');
      }
    });
  });

  return (
    <section className={styles.maker}>
      <Header onLogout={onLogout} />
      <div className={styles.container}>
        <Editor cards={cards} />
        <Preview cards={cards} />
      </div>
      <Footer />
    </section>
  );
};

export default Maker;
