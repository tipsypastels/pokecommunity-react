import React, { Component } from 'react';
import pluralize from 'pluralize';

import Icon from '../Icon';

import Block from '../Block';

import PollInterface from '../../types/PollInterface';

import '../../../styles/modules/ThreadPoll.scss';

interface IProps {
  poll: PollInterface;
}

const pollStatusName = (isPublic: number) => (
  ['Open', 'Secret'][isPublic]
)

class ThreadPoll extends Component<IProps> {
  render() {
    return (
      <Block.ListContent className="ThreadPoll" listItems={this.getItems()}>
        <div className="desktop-flex flex-v-center">
          <h2 className="flex-grows">
            {this.props.poll.question}
          </h2>

          <small className="poll-type">
            <Icon fw name="chart-pie" />
            {pollStatusName(this.props.poll.public)} Poll
          </small>
        </div>
      </Block.ListContent>
    )
  }

  getTotalVotes() {
    return this.props.poll.options.reduce((total, option) => {
      return total + option.votes.length;
    }, 0);
  }



  getItems() {
    return this.props.poll.options.map(option => {
      let phrase = `${option.votes.length} ${pluralize('votes', option.votes.length)}`;
      let percentage = (option.votes.length / this.getTotalVotes()) * 100;

      return (
        <li key={option.title}>
          <div className="poll-progress" style={{
            backgroundSize: `${percentage}%`,
          }}>
            <strong>
              {phrase}
            </strong>

            <span className="option-title">
              {option.title}
            </span>
          </div>
        </li>
      );
    });
  }
}

export default ThreadPoll;