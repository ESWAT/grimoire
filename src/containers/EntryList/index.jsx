import React, {Component} from 'react';
import {hashHistory} from 'react-router';
import {observer, inject} from 'mobx-react';
import Entry from '~/components/Entry';

@inject(
  'entryStore',
) @observer
class EntryList extends Component {
  handleEntryClick = (entry) => {
    return () => {
      hashHistory.push(`/edit/${entry.id}`);
    };
  }

  renderList() {
    return (
      <ul>
        {this.props.entryStore.entries.reverse().map((entry, index) =>
          <Entry key={entry.id} entry={entry} handleClick={this.handleEntryClick(entry)} />
        )}
      </ul>
    );
  }

  renderEmpty() {
    return (
      <p>No entries yet</p>
    );
  }

  render() {
    return (
      <div>
        {this.props.entryStore.entries && this.props.entryStore.entries.length > 0 ? this.renderList() : this.renderEmpty()}
      </div>
    );
  }
};

export default EntryList;
