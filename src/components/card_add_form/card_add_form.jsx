import React, { memo, useRef, useState } from "react";
import Button from "../button/button";
import styles from "./card_add_form.module.css";
import { v4 as uuidv4 } from "uuid";
import CloseButton from "../close_button/close_button";

const CardAddForm = memo(({ FileInput, onAdd, setNewCard, isDark }) => {
  const formRef = useRef();
  const nameRef = useRef();
  const companyRef = useRef();
  const themeRef = useRef();
  const titleRef = useRef();
  const emailRef = useRef();
  const messageRef = useRef();
  const [file, setFile] = useState({ fileName: null, fileURL: null });

  const themeType = isDark === "dark" ? styles.dark : styles.light;

  const onFileChange = (file) => {
    setFile({
      fileName: file.name,
      fileURL: file.url,
    });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    const card = {
      id: uuidv4(),
      name: nameRef.current.value || "",
      company: companyRef.current.value || "",
      theme: themeRef.current.value,
      title: titleRef.current.value || "",
      email: emailRef.current.value || "",
      message: messageRef.current.value || "",
      fileName: file.fileName || "",
      fileURL: file.fileURL || "",
    };
    formRef.current.reset();
    setFile({
      fileName: null,
      fileURL: null,
    });
    onAdd(card);
    setNewCard(false);
  };

  const onClose = (e) => {
    if (e.target === e.currentTarget) {
      setNewCard(false);
    }
  };

  const onClickCloseBtn = () => {
    setNewCard(false);
  };

  return (
    <div onClick={onClose} className={styles.overlay}>
      <div className={`${styles.container} ${themeType}`}>
        <CloseButton onClick={onClickCloseBtn} />
        <form ref={formRef} className={`${styles.form} ${themeType}`}>
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
            <option
              className={`${styles.option} ${themeType}`}
              placeholder="dark"
            >
              dark
            </option>
            <option
              className={`${styles.option} ${themeType}`}
              placeholder="colorful"
            >
              colorful
            </option>
            <option
              className={`${styles.option} ${themeType}`}
              placeholder="light"
            >
              light
            </option>
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
            <FileInput name={file.fileName} onFileChange={onFileChange} />
          </div>
          <Button name="Add" onClick={onSubmit} />
        </form>
      </div>
    </div>
  );
});

export default CardAddForm;
