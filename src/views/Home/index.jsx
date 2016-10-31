import React, {Component} from 'react';
import {observer, inject} from 'mobx-react';
import EntryList from '~/containers/EntryList';
import DocumentTitle from 'react-document-title';
import styles from './styles.css';

@inject(
  'entryStore',
  'champStore',
) @observer
class Home extends Component {
  render() {
    return (
      <DocumentTitle title="Grimoire">
        <div className={styles.body}>
          <EntryList/>
        </div>
      </DocumentTitle>
    );
  }
}

module.exports = Home;
