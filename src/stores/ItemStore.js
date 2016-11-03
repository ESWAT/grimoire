import {observable, computed, action} from 'mobx';
import {grimoireDb} from '~/shared/grimoireDb';
import {find, findIndex} from 'lodash';
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
    this.itemsChanged = findIndex((this.items), {fresh: true}) !== -1 ? true : false;
  }

  @action populateItems(items) {
    this.items = items;
  }

  @action addRandomItem() {
    let randomItem = this.getRandomItem();
    let isDuplicate = this.checkDuplicate(randomItem);
    let searchCount = 0;

    while (isDuplicate && searchCount !== itemList.length) {
      randomItem = this.getRandomItem();
      isDuplicate = this.checkDuplicate(randomItem);
      searchCount++;
    }

    if (!isDuplicate) {
      const itemToAdd = new ItemModel(
        randomItem.id,
        randomItem.name,
        randomItem.quote,
        randomItem.rarity,
      );
      this.addItem(itemToAdd);
      grimoireDb.items.put(itemToAdd);
    }
  }

  @action seeItem(item) {
    const foundItem = findIndex(this.items, {id: item.id});
    if (foundItem !== -1) {
      this.items[foundItem].fresh = false;
      grimoireDb.items.update(this.items[foundItem].id, this.items[foundItem]);
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
    return find(this.items, (item) => {
      return item.id === id;
    });
  }

  getRandomItem() {
    return itemList[Math.floor(Math.random() * itemList.length)];
  }

  checkDuplicate(item) {
    return findIndex(this.items, {id: item.id}) !== -1 ? true : false;
  }
}

const itemStore = new ItemStore();

export default itemStore;
export {ItemStore};
