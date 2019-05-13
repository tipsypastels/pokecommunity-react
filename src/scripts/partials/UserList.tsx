import React, { Component } from 'react';

import UserInterface from '../types/UserInterface';

import '../../styles/modules/UserList.scss';

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
      let avatarIMG = {
        backgroundImage: `url(${user.avatarURL})`
      }
      return <div
        className="user flex flex-v-center"
        key={`user-${user}`}
      >
        <div
          className="avatar"
          title={`${user.username}'s Avatar`}
          style={avatarIMG}
        >
        </div>
        <div className={`username`}>
          {user.username}
        </div>
      </div>
    });
  }
}

export default UserList;