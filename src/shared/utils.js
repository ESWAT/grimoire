// Detects and returns the appropriate time window for journal entries

const periodLimits = {
  MORNING: 3,
  EVENING: 12,
};

const getTimePeriod = (date) => {
  const windowDate = new Date(date).getHours();

  if (windowDate >= periodLimits.MORNING && windowDate <= periodLimits.EVENING)
    return 'MORNING';
  else
    return 'EVENING';
};

const autoCase = (string) => {
  const period = string.toLowerCase();
  return period.charAt(0).toUpperCase() + period.slice(1);
};

export {periodLimits, getTimePeriod, autoCase};
