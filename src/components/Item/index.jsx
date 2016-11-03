import React, {PropTypes} from 'react';
import styles from './styles.css';
import classNames from 'classnames/bind';

const cx = classNames.bind(styles);

const propTypes = {
  item: PropTypes.object.isRequired,
  owned: PropTypes.bool.isRequired,
  handleClick: PropTypes.func,
  fresh: PropTypes.bool.isRequired,
};

const Item = (props) => {
  // eslint-disable-next-line prefer-template
  const image = require('~/images/items/' + props.item.id + '.svg');
  const iconClassName = cx({
    icon: true,
    owned: props.owned,
    fresh: props.fresh,
  });

  return (
    <button className={styles.body} onClick={props.handleClick}>
      <img className={iconClassName} src={image} />
    </button>
  );
};

Item.PropTypes = propTypes;

export default Item;
