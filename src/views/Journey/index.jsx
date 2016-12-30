import React, {Component} from 'react';
import {observer, inject} from 'mobx-react';
import Settings from '~/containers/Settings';
import Streak from '~/components/Streak';
import DocumentTitle from 'react-document-title';
import styles from './styles.css';

@inject(
  'champStore',
  'uiStore',
) @observer
class Journey extends Component {
  render() {
    return (
      <DocumentTitle title="Grimoire - Journey">
        <div className={styles.body}>
          <Streak currentStreak={this.props.champStore.currentStreak} longestStreak={this.props.champStore.longestStreak} />
          <Settings />
        </div>
      </DocumentTitle>
    );
  }
}

module.exports = Journey;
