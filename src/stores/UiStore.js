import {observable, action} from 'mobx';

class UiStore {
  @observable modalContent = null;

  @action updateModal(content) {
    this.modalContent = content;
  }

  @action clearModal() {
    this.modalContent = null;
  }
}

const uiStore = new UiStore();

export default uiStore;
export {UiStore};
