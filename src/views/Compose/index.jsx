import React, {Component} from 'react';
import {observer, inject} from 'mobx-react';
import {getTimePeriod, autoCase} from '~/shared/utils';
import EntryForm from '~/containers/EntryForm';
import DocumentTitle from 'react-document-title';
import fecha from 'fecha';
import styles from './styles.css';

@inject(
  'entryStore',
) @observer
class Compose extends Component {
  componentWillMount() {
    this.props.entryStore.newEntry();
  }

  canCompose() {
    const entryStore = this.props.entryStore;

    if (entryStore.entries.length === 0 || entryStore.currentEntry !== -1)
      return true;

    const lastEntry = entryStore.entries[entryStore.entries.length - 1];
    const timePeriod = getTimePeriod(Date.now());
    const sameDay = new Date(lastEntry.dateCreated).toDateString() === new Date().toDateString();
    if ((sameDay && lastEntry.timePeriod !== timePeriod) || !sameDay) {
      return true;
    }

    return false;
  }

  render() {
    const entry = this.props.entryStore.tempEntry;
    const heading = `${autoCase(entry.timePeriod)} of ${fecha.format(entry.normalizedDate, 'MMM Do')}`;
    return (
      <DocumentTitle title="Grimoire - Write">
        <div className={styles.body}>
          <h1 className={styles.heading}>{heading}</h1>
          {this.canCompose() || this.props.entryStore.currentEntry > -1 ? <EntryForm existingEntry={this.props.params.id ? true : false} /> : <p>You’ve already written for that period of today.</p>}
        </div>
      </DocumentTitle>
    );
  }
};

module.exports = Compose;
