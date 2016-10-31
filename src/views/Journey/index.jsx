import React, {Component} from 'react';
import {observer, inject} from 'mobx-react';
import ItemList from '~/containers/ItemList';
import Settings from '~/containers/Settings';
import Streak from '~/components/Streak';
import DocumentTitle from 'react-document-title';
import styles from './styles.css';

@inject(
  'itemStore',
  'champStore',
  'uiStore',
) @observer
class Journey extends Component {
  render() {
    return (
      <DocumentTitle title="Grimoire - Journey">
        <div className={styles.body}>
          <ItemList/>
          <Streak currentStreak={this.props.champStore.currentStreak} longestStreak={this.props.champStore.longestStreak} />
          <Settings />
        </div>
      </DocumentTitle>
    );
  }
}

module.exports = Journey;
