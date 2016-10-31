import React from 'react';
import styles from './styles.css';

const Credits = () => {
  return (
    <div>
      <p>Created by <a className={styles.link} href="https://eswat.ca/">Philip Karpiak</a></p>
      <p>Icons by <a className={styles.link} href="http://game-icons.net/">Game-icons.net</a></p>
    </div>
  );
};

export default Credits;