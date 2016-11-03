import React, {PropTypes} from 'react';
import styles from './styles.css';
import classNames from 'classnames/bind';

const cx = classNames.bind(styles);

const propTypes = {
  item: PropTypes.object.isRequired,
};

const ItemModal = (props) => {
  // eslint-disable-next-line prefer-template
  const image = require('~/images/items/' + props.item.id + '.svg');
  const rarityStyle = (rarity) => {
    switch (rarity) {
    case 2:
      return 'legendary';
    case 1:
      return 'rare';
    case 0:
    default:
      return 'common';
    }
  };
  const titleClassName = cx({
    title: true,
    [styles[rarityStyle(props.item.rarity)]]: true,
  });

  return (
    <div className={styles.body}>
      <img className={styles.icon} src={image} />
      <p className={titleClassName}>{props.item.name}</p>
      {props.item.quote ? <p className={styles.quote}>{props.item.quote}</p> : null}
    </div>
  );
};

ItemModal.PropTypes = propTypes;

export default ItemModal;
