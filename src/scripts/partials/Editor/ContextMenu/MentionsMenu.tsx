import React, { Component, ReactNode } from 'react';
import ContextMenu from '../ContextMenu';
import Icon from '../../Icon';
import MinimalUserInterface from '../../../types/MinimalUserInterface';
import MentionableUser from '../../User/MentionableUser';
import TextareaTransformer from '../../../helpers/Editor/TextareaTransformer';

interface IProps {
  cursorPos: { left: number, top: number, height: number };
  transformer: TextareaTransformer;
  // insertText: (text: string) => void;
  // currentWord: string;
}

interface IState {
  mentionableUsers?: MinimalUserInterface[];
  selectionIndex: number;
}

const MAX_MENTIONABLE_USERS_TO_SHOW_AT_ONCE = 5;

const MOCK_DATA = [
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
    id: 3002,
    username: 'Hiroshi Sotomura',
    avatar: 'https://www.pokecommunity.com/customavatars/thumbs/avatar5_9.gif',
  },
  {
    id: 67132,
    username: 'Nina',
    avatar: 'https://www.pokecommunity.com/customavatars/thumbs/avatar67163_92.gif',
  },
];

export default class MentionsMenu extends Component<IProps, IState> {
  constructor(props) {
    super(props);
    this.state = {
      mentionableUsers: MOCK_DATA,
      selectionIndex: 0,
    };
  }

  componentDidMount() {
    window.addEventListener('keydown', this.keybinds);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.keybinds);
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

  keybinds = (e) => {
    if (e.keyCode === 40 /* down arrow */) {
      e.preventDefault();
      e.stopPropagation();
      this.moveSelectionIndex('down');
    }

    if (e.keyCode === 38 /* up arrow */) {
      e.preventDefault();
      e.stopPropagation();
      this.moveSelectionIndex('up');
    }

    if (e.keyCode === 13 /* enter */) {
      if (this.autocompleteCurrentlySelectedUser()) {
        e.preventDefault();
        e.stopPropagation();
      }
    }
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
        <div className="no-results">
          Couldn't find anyone on your friends list with that name. <strong>Don't worry</strong> - you can still mention any user on PokéCommunity!
        </div>
      );
    }

    return (
      <div className="mentionable-users">
        <div className="title">
          Mention a friend
        </div>

        {users.map((user, i) => (
          <MentionableUser 
            key={user.id}
            completedPartOfName={this.getMentionedNameWithoutSymbol()}
            selected={this.state.selectionIndex === i}
            enter={this.autocompleteCurrentlySelectedUser}
            hover={() => {
              this.setState({ selectionIndex: i });
            }}
            {...user}
          />
        ))}
      </div>
    );
  }

  getRelevantUsers(): MinimalUserInterface[] {
    const users = this.state.mentionableUsers;
    if (!users) {
      return;
    }

    const mentionedName = this.getMentionedNameWithoutSymbol();
    return users
      .filter(user => user.username.startsWith(mentionedName))
      .slice(0, MAX_MENTIONABLE_USERS_TO_SHOW_AT_ONCE);
  }

  moveSelectionIndex(direction: 'down' | 'up') {
    const count = this.getRelevantUsers().length;
    let { selectionIndex } = this.state;

    if (direction === 'down') {
      selectionIndex += 1;
      if (selectionIndex >= count) {
        selectionIndex = 0;
      }
    } else {
      selectionIndex -= 1;
      if (selectionIndex < 0) {
        selectionIndex = count - 1;
      }
    }

    this.setState({ selectionIndex });
  }

  autocompleteCurrentlySelectedUser = (): boolean => {
    const users = this.getRelevantUsers();
    const user = users[this.state.selectionIndex];

    if (!user) {
      return false;
    }

    this.props.transformer.replaceCurrentWordWith(`@${user.username} `);
    return true;
  }

  getMentionedNameWithoutSymbol(): string | null {
    const { currentWord } = this.props.transformer;
    if (currentWord) {
      return currentWord.replace(/^@/, '');
    } 
    return null;
  }
}