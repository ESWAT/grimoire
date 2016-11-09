import React, {Component} from 'react';
import {hashHistory} from 'react-router';
import {inject} from 'mobx-react';
import CreditsModal from '~/components/CreditsModal';
import styles from './styles.css';

@inject(
  'entryStore',
  'champStore',
  'itemStore',
  'uiStore',
)
class Settings extends Component {
  handleClick = () => {
    if (window.confirm('Are you sure you want to reset Grimoire? All data will be lost.')) {
      this.props.champStore.resetChampion();
      this.resetData();
    }
  }

  handleClick2 = () => {
    if (window.confirm('Are you sure you want to reset Grimoire? All data, except your Longest Streak, will be lost.')) {
      this.props.champStore.resetChampionRetainStreak();
      this.resetData();
    }
  }

  handleClick3 = () => {
    const modalContent = <CreditsModal />;
    this.props.uiStore.updateModal(modalContent);
  }

  resetData() {
    this.props.entryStore.resetEntries();
    this.props.itemStore.resetItems();
    hashHistory.push('/');
  }

  render() {
    return (
      <div className={styles.body}>
        <button className={styles.button} onClick={this.handleClick}>Reset Grimoire</button>
        <button className={styles.button} onClick={this.handleClick2}>Reset Grimoire but Keep Longest Streak</button>
        <br />
        <button className={styles.button} onClick={this.handleClick3}>Credits</button>
      </div>
    );
  }
};

export default Settings;
