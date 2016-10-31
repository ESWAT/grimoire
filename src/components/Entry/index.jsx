import React, {PropTypes} from 'react';
import fecha from 'fecha';
import {autoCase} from '~/shared/utils';
import questionList from '~/shared/questions';
import styles from './styles.css';

const propTypes = {
  entry: PropTypes.object.isRequired,
  handleClick: PropTypes.func.isRequired,
};

const Entry = (props) => {
  return (
    <div className={styles.container} onClick={props.handleClick}>
      <div>
        <p className={styles.type}>{autoCase(props.entry.timePeriod)}</p>
        <p className={styles.date}>{fecha.format(props.entry.dateCreated, 'MMM Do')}</p>
      </div>
      <div className={styles.content}>
        <h3 className={styles.heading}>
          {props.entry.timePeriod === 'MORNING'
          ? (props.entry.answer1 ? questionList.MORNING[0] : questionList.MORNING[1])
          : (props.entry.answer1 ? questionList.EVENING[0] : questionList.EVENING[1])}
        </h3>
        <p>{props.entry.answer1 ? props.entry.answer1 : props.entry.answer2}</p>
      </div>
    </div>
  );
};

Entry.PropTypes = propTypes;

export default Entry;
