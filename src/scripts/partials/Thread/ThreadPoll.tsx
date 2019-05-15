import React, { Component } from 'react';
import { ProgressBar } from 'react-bootstrap';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChartPie } from '@fortawesome/pro-solid-svg-icons';

import PollInterface from '../../types/PollInterface';

import '../../../styles/modules/ThreadPoll.scss';

interface IProps {
  poll: PollInterface;
}

class ThreadPoll extends Component<IProps> {
  render() {
    return (
      <div className="ThreadPoll">
        <div className="poll-header flex">
          <h3 className="flex-grows">
            {this.props.poll.question}
          </h3>
          <span className="poll-type">
            <FontAwesomeIcon 
              className="fa-fw"
              icon={faChartPie}
            />
            {this.props.poll.type} Poll
          </span>
        </div>
        <ul className="poll-options">
          {this.generatePollOptions()}
        </ul>
      </div>
    );
  }

  getTotalVotes() {
    return this.props.poll.options.reduce((total, option) => {
      return total + option.votes.length;
    }, 0);
  }

  generatePollOptions() {

    return this.props.poll.options.map(option =>
      <li className="flex flex-v-center">
        <span className="option-title">
          {option.title}
        </span>
        <ProgressBar
          now={(option.votes.length / this.getTotalVotes()) * 100}
          label={`${option.votes.length} votes`}
        />
      </li>
    );
  }
}

export default ThreadPoll;