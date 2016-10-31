import React, {Component} from 'react';
import CSSTransitionGroup from 'react-addons-css-transition-group';
import {inject, observer} from 'mobx-react';
import styles from './styles.css';

@inject(
  'uiStore',
) @observer
class Modal extends Component {
  handleClick = (event) => {
    event.preventDefault();
    this.props.uiStore.clearModal();
  }

  renderModal() {
    return (
      <div className={styles.body}>
        <div className={styles.overlay} onClick={this.handleClick} />
        <div className={styles.wrap}>
          <button className={styles.close} onClick={this.handleClick}>×</button>
          {this.props.uiStore.modalContent}
        </div>
      </div>
    );
  }

  render() {
    return (
      <CSSTransitionGroup
        transitionName={{
          enter: styles.enter,
          enterActive: styles.enterActive,
          leave: styles.leave,
          leaveActive: styles.leaveActive,
        }}
        transitionEnterTimeout={250}
        transitionLeaveTimeout={250}
      >
        {this.props.uiStore.modalContent ? this.renderModal() : null}
      </CSSTransitionGroup>
    );
  }
};

export default Modal;
