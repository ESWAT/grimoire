import React, {Component} from 'react';
import {observer, inject} from 'mobx-react';
import Item from '~/components/Item';
import ItemModal from '~/components/ItemModal';
import styles from './styles.css';

@inject(
  'itemStore',
  'uiStore',
) @observer
class ItemList extends Component {
  handleItemClick = (item) => {
    return () => {
      const modalContent = <ItemModal item={item} />;
      this.props.itemStore.seeItem(item);
      this.props.uiStore.updateModal(modalContent);
    };
  }

  renderItem(item) {
    const ownsItem = this.props.itemStore.ownsItem(item.id);
    return (
      <Item key={item.id} item={item} owned={ownsItem ? true : false} fresh={ownsItem && ownsItem.fresh ? true : false} handleClick={ownsItem ? this.handleItemClick(item) : null} />
    );
  }

  render() {
    return (
      <div className={styles.body}>
        {this.props.itemStore.itemManifest.map((item) =>
          this.renderItem(item)
        )}
      </div>
    );
  }
};

export default ItemList;
