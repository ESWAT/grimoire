import React, {PropTypes} from 'react';
import styles from './styles.css';

const propTypes = {
  currentStreak: PropTypes.number.isRequired,
  longestStreak: PropTypes.number.isRequired,
};

const Streak = (props) => {
  return (
    <div className={styles.body}>
      <div className={styles.section}>
        <p className={styles.counter}>{props.currentStreak}</p>
        <p className={styles.label}>Current Streak</p>
      </div>
      <div className={styles.section}>
        <p className={styles.counter}>{props.longestStreak}</p>
        <p className={styles.label}>Longest Streak</p>
      </div>
    </div>
  );
};

Streak.PropTypes = propTypes;

export default Streak;
