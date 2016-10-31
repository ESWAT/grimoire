import React, {PropTypes} from 'react';
import {IndexLink} from 'react-router';
import styles from './styles.css';

const propTypes = {
  to: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
};

const IndexTab = (props) => {
  return (
    <IndexLink to={props.to} className={styles.button} activeClassName={styles.activeButton}>{props.name}</IndexLink>
  );
};

IndexTab.PropTypes = propTypes;

export default IndexTab;
