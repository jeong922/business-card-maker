import React from "react";
import CloseButton from "../close_button/close_button";
import styles from "./card_edit_form.module.css";

const CardEditForm = ({ FileInput, card, updateCard, setEditCard, isDark }) => {
  const { name, theme, company, title, email, message, fileName } = card;

  const themeType = isDark === "dark" ? styles.dark : styles.light;

  const onFileChange = (file) => {
    updateCard({
      ...card,
      fileName: file.name,
      fileURL: file.url,
    });
  };

  const onChange = (e) => {
    if (e.currentTarget == null) {
      return;
    }
    e.preventDefault();
    updateCard({
      ...card,
      [e.currentTarget.name]: e.currentTarget.value,
    });
  };

  const onClose = (e) => {
    if (e.target === e.currentTarget) {
      setEditCard(false);
    }
  };

  const onClickCloseBtn = () => {
    setEditCard(false);
  };

  return (
    <div onClick={onClose} className={styles.overlay}>
      <div className={`${styles.container} ${themeType}`}>
        <CloseButton onClick={onClickCloseBtn} />
        <form className={styles.form}>
          <input
            className={styles.input}
            type="text"
            name="name"
            value={name}
            onChange={onChange}
            placeholder="Name"
          />
          <input
            className={styles.input}
            type="text"
            name="company"
            value={company}
            onChange={onChange}
            placeholder="Company"
          />
          <select
            className={styles.select}
            name="theme"
            value={theme}
            onChange={onChange}
            placeholder="Theme"
          >
            <option className={`${styles.option} ${themeType}`} value="light">
              Light
            </option>
            <option className={`${styles.option} ${themeType}`} value="dark">
              Dark
            </option>
            <option
              className={`${styles.option} ${themeType}`}
              value="colorful"
            >
              Colorful
            </option>
          </select>
          <input
            className={styles.input}
            type="text"
            name="title"
            value={title}
            onChange={onChange}
            placeholder="Title"
          />
          <input
            className={styles.input}
            type="text"
            name="email"
            value={email}
            onChange={onChange}
            placeholder="Email"
          />
          <textarea
            className={styles.textarea}
            name="message"
            value={message}
            onChange={onChange}
            placeholder="Message"
          ></textarea>
          <div className={styles.fileInput}>
            <FileInput name={fileName} onFileChange={onFileChange} />
          </div>
        </form>
      </div>
    </div>
  );
};

export default CardEditForm;
