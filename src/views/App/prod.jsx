import React from 'react';
import TabList from '~/containers/TabList';
import Modal from '~/containers/Modal';
import styles from './styles.css';

const App = (props) => {
  const {children} = props;

  return (
    <div className={styles.app}>
      <TabList />
      <Modal />
      {children}
    </div>
  );
};

export default App;
