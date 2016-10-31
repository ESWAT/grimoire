import {observable} from 'mobx';
import {periodLimits, getTimePeriod} from '~/shared/utils';
import shortid from 'shortid';

export default class EntryModel {
  id = shortid.generate();
  dateCreated = Date.now();
  normalizedDate = this.getNormalizedDate();
  @observable timePeriod = getTimePeriod(this.normalizedDate);
  @observable answer1 = '';
  @observable answer2 = '';
  @observable answer3 = '';
  @observable answer4 = '';

  constructor(a1, a2, a3, a4) {
    this.answer1 = a1;
    this.answer2 = a2;
    this.answer3 = a3;
    this.answer4 = a4;
  }

  getNormalizedDate() {
    const hour = new Date(this.dateCreated).getHours();
    const normalizedDate = new Date(this.dateCreated);

    if (hour >= 0 && hour < periodLimits.MORNING) {
      const yesterday = normalizedDate.getDate() - 1;
      normalizedDate.setDate(yesterday);
      normalizedDate.setHours(23, 59, 59, 999);
    }

    return normalizedDate;
  }
}
