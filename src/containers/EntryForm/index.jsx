import React, {Component, PropTypes} from 'react';
import {hashHistory} from 'react-router';
import {observable, action} from 'mobx';
import {observer, inject} from 'mobx-react';
import autosize from 'autosize';
import questionList from '~/shared/questions';
import styles from './styles.css';

const propTypes = {
  existingEntry: PropTypes.bool.isRequired,
};

@inject(
  'entryStore',
  'champStore'
) @observer
class EntryForm extends Component {
  componentDidMount() {
    const textareas = document.querySelectorAll('textarea');
    autosize(textareas);
    this.inputs = textareas;
    this.inputs[this.inputs.length] = document.querySelector('button');
    if (this.fresh) {
      this.inputs[0].focus();
    }
  }

  componentDidUpdate() {
    autosize.update(document.querySelectorAll('textarea'));
  }

  @observable fresh = !this.props.existingEntry;
  inputs = [];

  @action unfresh() {
    this.fresh = false;
  }

  handleClick = (event) => {
    event.preventDefault();
    hashHistory.push('/');
  }

  handleKeyDown = (event) => {
    if (event.keyCode === 13) {
      event.preventDefault();
      const activeInput = [...this.inputs].findIndex((obj) => {
        return obj === document.activeElement;
      });
      this.inputs[activeInput + 1].focus();
    }
  }

  handleChange = (event) => {
    if (this.fresh) {
      this.unfresh();
    }

    this.props.entryStore.updateEntry(event.target.name, event.target.value);
    this.props.champStore.updateLastEntry(this.props.entryStore.entries[this.props.entryStore.entries.length - 1]);
  }

  renderSoloQuestion() {
    return (
      <div key="solo" className={styles.section}>
        <span className={styles. inputHeading}>{questionList[this.props.entryStore.tempEntry.timePeriod][0]}</span>
        <textarea className={styles.input} onKeyDown={this.handleKeyDown} onChange={this.handleChange} name="answer1" rows="1" value={this.props.entryStore.tempEntry.answer1} />
      </div>
    );
  }

  renderMultiQuestion() {
    return (
      <div key="multi" className={styles.section}>
        <span className={styles. inputHeading}>{questionList[this.props.entryStore.tempEntry.timePeriod][1]}</span>
        <textarea className={styles.input} onKeyDown={this.handleKeyDown} onChange={this.handleChange} name="answer2" rows="1" value={this.props.entryStore.tempEntry.answer2} />
        <textarea className={styles.input} onKeyDown={this.handleKeyDown} onChange={this.handleChange} name="answer3" rows="1" value={this.props.entryStore.tempEntry.answer3} />
        <textarea className={styles.input} onKeyDown={this.handleKeyDown} onChange={this.handleChange} name="answer4" rows="1" value={this.props.entryStore.tempEntry.answer4} />
      </div>
    );
  }

  render() {
    const formOrder = [];

    if (this.props.entryStore.tempEntry.timePeriod === 'MORNING') {
      formOrder.push(this.renderSoloQuestion());
      formOrder.push(this.renderMultiQuestion());
    } else {
      formOrder.push(this.renderMultiQuestion());
      formOrder.push(this.renderSoloQuestion());
    }

    return (
      <form className={styles.form}>
        {formOrder}
        <button onClick={this.handleClick} className={styles.button}>Done</button>
      </form>
    );
  }
};

EntryForm.PropTypes = propTypes;

export default EntryForm;
