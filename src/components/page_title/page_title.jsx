import React, { memo } from 'react';
import styles from './page_title.module.css';

const PageTitle = ({ title }) => {
  return <h2 className={styles.title}>{title}</h2>;
};

export default memo(PageTitle);
