import React, { Component } from 'react';
import pluralize from 'pluralize';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChartPie } from '@fortawesome/pro-solid-svg-icons';

import Block from '../Block';

import PollInterface from '../../types/PollInterface';

import '../../../styles/modules/ThreadPoll.scss';

interface IProps {
  poll: PollInterface;
}

class ThreadPoll extends Component<IProps> {
  render() {
    return (
      <Block.ListContent className="ThreadPoll" listItems={this.getItems()}>
        <div className="flex flex-v-center">
          <h2 className="flex-grows">
            {this.props.poll.question}
          </h2>

          <small className="poll-type">
            <FontAwesomeIcon 
              className="fa-fw"
              icon={faChartPie}
            />
            {this.props.poll.type} Poll
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
        <li>
          <div className="poll-progress" style={{
            backgroundSize: `${percentage}%`,
          }}>
            <strong>
              {phrase}
            </strong>

            <span>
              {option.title}
            </span>
          </div>
        </li>
      );
    });
  }
}

export default ThreadPoll;