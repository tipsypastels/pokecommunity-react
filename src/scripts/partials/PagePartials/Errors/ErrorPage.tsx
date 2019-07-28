import React, { Component, ReactNode } from 'react';

import { Button } from 'react-bootstrap';
import Icon from '../../Icon';

import '../../../../styles/modules/Errors/ErrorPage.scss';
import { Link } from 'react-router-dom';

interface IProps {
  children: ReactNode;
}

export default class ErrorPage extends Component<IProps> {
  render() {
    return (
      <div className="ErrorPage">
        <Icon className="error-icon" name="exclamation-triangle" size="lg" fw />
        <div className="error-subtitle">An error has occured!</div>
        <div className="error-message">
          {this.props.children}
        </div>

        <Link to="/">
          <Button variant="primary" className="error-home">
            Home
          </Button>
        </Link>
      </div>
    )
  }
}