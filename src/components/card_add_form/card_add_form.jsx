import React, { useRef } from 'react';
import Button from '../button/button';
import ImageFileInput from '../image_file_input/image_file_input';
import styles from './card_add_form.module.css';
import { v4 as uuidv4 } from 'uuid';

const CardAddForm = ({ onAdd, setNewCard }) => {
  const formRef = useRef();
  const nameRef = useRef();
  const companyRef = useRef();
  const themeRef = useRef();
  const titleRef = useRef();
  const emailRef = useRef();
  const messageRef = useRef();
  const onSubmit = (e) => {
    e.preventDefault();
    const card = {
      id: uuidv4(),
      name: nameRef.current.value || '',
      company: companyRef.current.value || '',
      theme: themeRef.current.value,
      title: titleRef.current.value || '',
      email: emailRef.current.value || '',
      message: messageRef.current.value || '',
      fileName: '',
      fileURL: '',
    };
    formRef.current.reset();
    onAdd(card);
    setNewCard(false);
  };

  const onClose = (e) => {
    if (e.target === e.currentTarget) {
      setNewCard(false);
    }
  };

  return (
    <div onClick={onClose} className={styles.overlay}>
      <div className={styles.container}>
        <form ref={formRef} className={styles.form}>
          <input
            ref={nameRef}
            className={styles.input}
            type="text"
            name="name"
            placeholder="Name"
          />
          <input
            ref={companyRef}
            className={styles.input}
            type="text"
            name="company"
            placeholder="Company"
          />
          <select
            ref={themeRef}
            className={styles.select}
            name="theme"
            placeholder="Theme"
          >
            <option placeholder="light">light</option>
            <option placeholder="dark">dark</option>
            <option placeholder="colorful">colorful</option>
          </select>
          <input
            ref={titleRef}
            className={styles.input}
            type="text"
            name="title"
            placeholder="Title"
          />
          <input
            ref={emailRef}
            className={styles.input}
            type="text"
            name="email"
            placeholder="Email"
          />
          <textarea
            ref={messageRef}
            className={styles.textarea}
            name="message"
            placeholder="Message"
          ></textarea>
          <div className={styles.fileInput}>
            <ImageFileInput />
          </div>
          <Button name="Add" onClick={onSubmit} />
        </form>
      </div>
    </div>
  );
};

export default CardAddForm;
