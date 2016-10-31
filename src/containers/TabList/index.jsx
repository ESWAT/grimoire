import React, {Component} from 'react';
import {withRouter} from 'react-router';
import {inject, observer} from 'mobx-react';
import LinkTab from '~/components/LinkTab';
import IndexTab from '~/components/IndexTab';
import styles from './styles.css';

@inject(
  'itemStore'
) @withRouter @observer
class TabList extends Component {
  render() {
    return (
      <div className={styles.body}>
        <ul className={styles.ul}>
          <li className={styles.li}>
            <LinkTab to="/compose" name="Write" />
          </li>
          <li className={styles.li}>
            <IndexTab to="/" name="Grimoire" />
          </li>
          <li className={styles.li}>
            <LinkTab to="/journey" name="Journey" highlight={this.props.itemStore.itemsChanged} />
          </li>
        </ul>
      </div>
    );
  }
};

export default TabList;
