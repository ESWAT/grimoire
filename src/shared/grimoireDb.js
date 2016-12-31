import Dexie from 'dexie';

const grimoireDb = new Dexie('grimoire');
grimoireDb.version(1).stores({
  entries: 'id,dateCreated,normalizedDate,timePeriod,answer1,answer2,answer3,answer4',
  items: 'id,name,rarity',
  champ: 'key,value',
});
grimoireDb.version(2).stores({
  entries: 'id, dateCreated',
  items: 'id',
  champ: 'key',
});
grimoireDb.version(3).stores({
  items: null,
});
grimoireDb.on('populate', () => {
  grimoireDb.champ.add({key: 'lastEntry', value: null});
  grimoireDb.champ.add({key: 'currentStreak', value: 0});
  grimoireDb.champ.add({key: 'longestStreak', value: 0});
});
grimoireDb.open();

export {grimoireDb};
