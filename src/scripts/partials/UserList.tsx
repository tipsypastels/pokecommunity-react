import React, { Component } from 'react';

import UserInterface from '../types/UserInterface';
import SmartLink from './SmartLink';

interface IProps {
  users: UserInterface[];
  listType: string,
}

class UserList extends Component<IProps> {
  render() {
    return (
      <div className={`UserList ${this.props.listType} flex`}>
        {this.renderUsers()}
      </div>
    );
  }

  renderUsers() {
    return this.props.users.map(user => {
      let avatar = {
        backgroundImage: `url(${user.avatar})`
      }
      return ( 
        <SmartLink
          to={`/member.php.php?u=${user.id}`}
          className="user flex flex-v-center"
          key={user.id}
        >
          <div
            className="avatar"
            title={`${user.username}'s Avatar`}
            style={avatar}
          />
          <div className={`username`}>
            {user.username}
          </div>
        </SmartLink>
      );
    });
  }
}

export default UserList;