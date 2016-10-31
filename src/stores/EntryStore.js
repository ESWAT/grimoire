import {observable, action} from 'mobx';
import {grimoireDb} from '~/shared/grimoireDb';
import EntryModel from '~/models/EntryModel';

const NEWPOST = -1;

class EntryStore {
  @observable entries = [];
  @observable currentEntry = NEWPOST;
  @observable tempEntry = null;

  constructor() {
    const storedEntries = grimoireDb.entries.orderBy('dateCreated').toArray();
    storedEntries.then((entries) => {
      this.populateEntries(entries);
    });

    this.newEntry();
  }

  @action populateEntries(entries) {
    this.entries = entries;
  }

  @action populateTempEntry(entry) {
    this.tempEntry = entry;
  }

  @action populateCurrentEntry(index) {
    this.currentEntry = index === -1 ? NEWPOST : index;
  }

  @action loadExistingEntry(entryId) {
    grimoireDb.entries.get(entryId)
      .then((result) => {
        const entryIndex = this.entries.findIndex((entry) => {
          return entry.id === entryId;
        });

        if (entryIndex >= 0) {
          this.populateCurrentEntry(entryIndex);
          this.populateTempEntry(this.entries[entryIndex]);
        }
      });
  }

  @action updateEntry(key, value) {
    this.tempEntry[key] = value;
    this.saveEntry();
  }

  @action newEntry() {
    this.currentEntry = NEWPOST;
    this.tempEntry = new EntryModel('','','','');
  }

  @action resetEntries() {
    this.entries = [];
    grimoireDb.entries.clear();
  }

  saveEntry() {
    if (this.currentEntry === NEWPOST) {
      this.entries.push(this.tempEntry);
      this.currentEntry = this.entries[this.entries.length - 1];
    } else {
      this.entries[this.currentEntry] = this.tempEntry;
    }

    grimoireDb.entries.update(this.tempEntry.id, this.tempEntry).then((updated) => {
      if (!updated) {
        grimoireDb.entries.put(this.tempEntry);
      }
    });
  }
}

const entryStore = new EntryStore();

export default entryStore;
export {EntryStore};
