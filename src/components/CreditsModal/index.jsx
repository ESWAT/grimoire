import React from 'react';
import styles from './styles.css';

const CreditsModal = (props) => {
  return (
    <div>
      <p>Created by <a className={styles.link} href="https://eswat.ca/">Philip Karpiak</a></p>
      <p>Logo by <a className={styles.link} href="https://twitter.com/osavox">osavox</a></p>
    </div>
  );
};

export default CreditsModal;
