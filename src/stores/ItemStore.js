import {observable, computed, action} from 'mobx';
import {grimoireDb} from '~/shared/grimoireDb';
import ItemModel from '~/models/ItemModel';
import itemList from '~/shared/items';

class ItemStore {
  @observable items = [];
  @observable itemsChanged = false;
  @observable itemManifest = itemList;

  constructor() {
    const storedItems = grimoireDb.items.toArray();
    storedItems.then((items) => {
      this.populateItems(items);

      this.updateItemsChanged();
    });
  }

  @action updateItemsChanged() {
    this.itemsChanged =
      this.items.findIndex((item) => item.fresh === true) !== -1
      ? true
      : false;
  }

  @action populateItems(items) {
    this.items = items;
  }

  @action addRandomItem() {
    if (this.items.length === itemList.length) {
      return;
    }

    let randomItem = null;
    let isDuplicate = true;

    while (isDuplicate) {
      randomItem = this.getRandomItem();
      isDuplicate = this.findExistingItem(randomItem) !== -1
        ? true
        : false;
    }

    const itemToAdd = new ItemModel(
      randomItem.id,
      randomItem.name,
      randomItem.quote,
      randomItem.rarity,
    );

    this.addItem(itemToAdd);
    grimoireDb.items.put(itemToAdd);
  }

  @action seeItem(item) {
    const foundItemIndex = this.findExistingItem(item);
    if (foundItemIndex !== -1) {
      this.items[foundItemIndex].fresh = false;
      grimoireDb.items.update(this.items[foundItemIndex].id, this.items[foundItemIndex]);
      this.updateItemsChanged();
    }
  }

  @action addItem(item) {
    this.items.push(item);
    this.updateItemsChanged();
  }

  @action resetItems() {
    this.items = [];
    grimoireDb.items.clear();
  }

  ownsItem(id) {
    return this.items.find((item) => {
      return item.id === id;
    });
  }

  getRandomItem() {
    return itemList[Math.floor(Math.random() * itemList.length)];
  }

  findExistingItem(item) {
    return this.items.findIndex((itemInDb) => itemInDb.id === item.id);
  }
}

const itemStore = new ItemStore();

export default itemStore;
export {ItemStore};
