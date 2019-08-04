import React, { Component } from 'react';
import UserInterface from '../types/UserInterface';
import AppContext from '../AppContext';

interface IProps {
  of: UserInterface;
  equality?: string;
}

// it'd be nice to have this as a function but there's no good way to use context then afaik
export default class Pronoun extends Component<IProps> {
  static contextType = AppContext;
  static defaultProps = { equality: 'your' } 

  render() {
    const { currentUser } = this.context;
    const { of: user, equality } = this.props;

    if (currentUser && currentUser.id === user.id) {
      return equality;
    } else {
      return `${user.username}'s`;
    }
  }
}
