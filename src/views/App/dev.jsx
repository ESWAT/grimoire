import React from 'react';
import TabList from '~/containers/TabList';
import Modal from '~/containers/Modal';
import classNames from 'classnames/bind';
import DevTools from 'mobx-react-devtools';
import styles from './styles.css';

const cx = classNames.bind(styles);

const App = (props) => {
  const {children} = props;
  const finalStyles = cx({
    app: true,
    dev: true,
  });

  return (
    <div className={finalStyles}>
      <TabList />
      <Modal />
      <DevTools />
      {children}
    </div>
  );
};

export default App;
