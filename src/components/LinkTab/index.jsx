import React, {PropTypes} from 'react';
import {Link} from 'react-router';
import classNames from 'classnames/bind';
import styles from './styles.css';

const cx = classNames.bind(styles);

const propTypes = {
  to: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  highlight: PropTypes.bool,
};

const LinkTab = (props) => {
  const className = cx({
    button: true,
    changedButton: props.highlight,
  });

  return (
    <Link to={props.to} className={className} activeClassName={styles.activeButton}>{props.name}</Link>
  );
};

LinkTab.PropTypes = propTypes;

export default LinkTab;
