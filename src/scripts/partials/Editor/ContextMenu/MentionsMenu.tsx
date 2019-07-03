import React, { Component, ReactNode } from 'react';
import ContextMenu from '../ContextMenu';
import Icon from '../../Icon';
import MinimalUserInterface from '../../../types/MinimalUserInterface';

import '../../../../styles/modules/Editor/ContextMenus/MentionsMenu.scss';
import MentionableUser from '../../User/MentionableUser';

interface IProps {
  cursorPos: { left: number, top: number, height: number };
}

interface IState {
  mentionableUsers?: MinimalUserInterface[];
}

export default class MentionsMenu extends Component<IProps, IState> {
  constructor(props) {
    super(props);
    this.state = {
      mentionableUsers: undefined,
    };
  }

  componentDidMount() {
    // TODO api call here!
    this.setState({ mentionableUsers: [
      {
        id: 210532,
        username: 'Rainbow',
        avatar: 'https://development.pokecommunity.com/customavatars/avatar210532_651.gif',
      },
      {
        id: 5,
        username: 'Laslow',
        avatar: 'https://www.pokecommunity.com/customavatars/thumbs/avatar5_9.gif',
      },
      {
        id: 67132,
        username: 'Nina',
        avatar: 'https://www.pokecommunity.com/customavatars/thumbs/avatar67163_92.gif',
      },
    ] });
  }

  render() {
    return (
      <ContextMenu 
        className="MentionsMenu" 
        cursorPos={this.props.cursorPos}
        width={200}
      >
        {this.getContent()}
      </ContextMenu>
    );
  }

  getContent(): ReactNode {
    const users = this.getRelevantUsers();
    if (!users) {
      return (
        <div className="loading">
          <Icon name="circle-notch" className="fa-spin" />

          <strong>
            Loading your friends...
          </strong>
        </div>
      )
    }

    if (users.length === 0) {
      return (
        <React.Fragment>
          Couldn't find anyone on your friends list with that name. <strong>Don't worry</strong> - you can still mention any user on PokéCommunity! 
        </React.Fragment>
      );
    }

    return (
      <div className="mentionable-users">
        <div className="title">
          Mention a friend
        </div>

        {users.map(user => (
          <MentionableUser 
            key={user.id}
            selected={false /* TODO */}
            {...user}
          />
        ))}
      </div>
    );
  }

  getRelevantUsers(): MinimalUserInterface[] {
    return this.state.mentionableUsers; // TODO filtering
  }
}