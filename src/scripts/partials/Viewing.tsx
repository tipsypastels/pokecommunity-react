import React, { Component } from 'react';

import Block from './Block';

import UserInterface from '../types/UserInterface';
import UserList from './UserList';

interface IProps {
  users: UserInterface[];
  guests: number;
  viewing: string;
}

class Viewing extends Component<IProps> {
  render() {
    // TODO plurarize
    const { users, guests, viewing } = this.props;
    return (
      <Block className="Viewing">
        <Block.Header>
          <h4>
            {users.length} people viewing this {viewing}
          </h4>

          <small className="text-small">
            ({guests} guests)
          </small>
        </Block.Header>

        <Block.Content>
          <UserList
            users={users}
            listType="list-horizontal"
          />
        </Block.Content>
      </Block>
    )
  }
}

export default Viewing;