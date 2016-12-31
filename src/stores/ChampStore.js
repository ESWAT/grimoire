import {observable, action} from 'mobx';
import {grimoireDb} from '~/shared/grimoireDb';

class ChampStore {
  @observable lastEntry = null;
  @observable currentStreak = 0;
  @observable longestStreak = 0;

  constructor() {
    const storedChamp = grimoireDb.champ.toArray();
    storedChamp.then((champ) => {
      this.populateChamp(champ);
    });
  }

  @action populateChamp(champ) {
    champ.forEach((setting) => {
      this[setting.key] = setting.value;
    });
  }

  @action updateLastEntry(entry) {
    this.updateCurrentStreak();
    this.lastEntry = entry;

    grimoireDb.champ.update('lastEntry', {value: this.lastEntry});
  }

  @action resetChampion() {
    this.lastEntry = null;
    this.currentStreak = 0;
    this.longestStreak = 0;
    grimoireDb.champ.update('lastEntry', {value: null});
    grimoireDb.champ.update('currentStreak', {value: 0});
    grimoireDb.champ.update('longestStreak', {value: 0});
  }

  @action resetChampionRetainStreak() {
    this.lastEntry = null;
    this.currentStreak = 0;
    grimoireDb.champ.update('lastEntry', {value: null});
    grimoireDb.champ.update('currentStreak', {value: 0});
  }

  updateCurrentStreak() {
    if (!this.lastEntry) {
      this.currentStreak++;

      if (this.longestStreak === 0) {
        this.longestStreak++;
      }
    } else {
      const today = new Date();
      const yesterday = new Date(today.setDate(today.getDate() - 1)).toDateString();
      const lastDate = new Date(this.lastEntry.dateCreated).toDateString();
      const validStreak = lastDate === yesterday;
      const stillToday = lastDate === new Date().toDateString();

      if (stillToday) {
        return;
      } else if (validStreak) {
        this.currentStreak++;

        if (this.longestStreak < this.currentStreak) {
          this.longestStreak++;
        }
      } else {
        this.streak = 0;
      }
    }

    grimoireDb.champ.update('currentStreak', {value: this.currentStreak});
    grimoireDb.champ.update('longestStreak', {value: this.longestStreak});
  }

}

const champStore = new ChampStore();

export default champStore;
export {ChampStore};
