import React, { Component } from 'react';

import UserInterface from '../types/UserInterface';

import vBRoute from '../bridge/vBRoute';

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
      return <a
        href={vBRoute('profile', user.userid)}
        className="user flex flex-v-center"
        key={user.userid}
      >
        <div
          className="avatar"
          title={`${user.username}'s Avatar`}
          style={avatarIMG}
        />
        <div className={`username`}>
          {user.username}
        </div>
      </a>
    });
  }
}

export default UserList;