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
class Edit extends Component {
  componentWillMount() {
    this.props.entryStore.loadExistingEntry(this.props.params.id);
  }

  render() {
    const entry = this.props.entryStore.tempEntry;
    const heading = `${autoCase(entry.timePeriod)} of ${fecha.format(entry.normalizedDate, 'MMM Do')}`;
    return (
      <DocumentTitle title={`Grimoire - ${heading}`}>
        <div className={styles.body}>
          <h1 className={styles.heading}>{heading}</h1>
          <EntryForm existingEntry={this.props.params.id ? true : false} />
        </div>
      </DocumentTitle>
    );
  }
};

module.exports = Edit;
