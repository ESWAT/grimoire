import {observable} from 'mobx';

export default class ItemModel {
  id = null;
  name = '';
  quote = '';
  rarity = 0;
  width = 0;
  @observable fresh = true;

  constructor(id, name, quote, rarity, width) {
    this.id = id;
    this.name = name;
    this.quote = quote;
    this.rarity = rarity;
    this.width = width;
    this.fresh = true;
  }
}
