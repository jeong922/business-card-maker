import React, { memo, useRef, useState } from 'react';
import Loading from '../loading/loading';
import styles from './image_file_input.module.css';

const ImageFileInput = memo(({ imageUploader, name, onFileChange }) => {
  const [isLoading, setIsLoading] = useState(false);
  const inputRef = useRef();
  const onButtonClick = (e) => {
    e.preventDefault();
    inputRef.current.click();
  };

  const onChange = async (e) => {
    setIsLoading(true);
    const uploaded = await imageUploader.upload(e.target.files[0]);
    setIsLoading(false);
    console.log(uploaded);
    onFileChange({ name: uploaded.original_filename, url: uploaded.url });
  };

  return (
    <div className={styles.container}>
      <input
        ref={inputRef}
        className={styles.input}
        type="file"
        accept="image/*"
        name="file"
        onChange={onChange}
      />
      {!isLoading && (
        <button
          className={`${styles.button} ${name ? styles.pink : styles.grey}`}
          onClick={onButtonClick}
        >
          {name || 'No file'}
        </button>
      )}
      {isLoading && <Loading />}
    </div>
  );
});

export default ImageFileInput;
