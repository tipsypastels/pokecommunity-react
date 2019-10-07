import React, { useContext } from 'react';
import { MinimalReactionCollectionInterface } from '../../types/ReactionInterface';
import AddReactionButton from './AddReactionButton';
import { Overlay, Popover } from 'react-bootstrap';
import { reactionOptions } from '../../../configs/config.json';
import AddReaction from './ActionModals/AddReaction';
import MinimalUserInterface from '../../types/MinimalUserInterface';
import AppContext from '../../AppContext';
import PostReactions from './PostReactions';
import { Dropdown } from 'react-bootstrap';
import DropdownTriggerWithoutFormatting from '../DropdownTriggerWithoutFormatting';

export function getUserPostReaction(reactions: MinimalReactionCollectionInterface, user: MinimalUserInterface): string {
  if (user) {
    for (let reactionOption in reactions) {
      if (reactions[reactionOption].map(r => r.userId).includes(user.id)) {
        return reactionOption;
      }
    }
  }

  return null;
}

interface IProps {
  reactions: MinimalReactionCollectionInterface;
  overlayRef: React.RefObject<HTMLDivElement>;
  openReactionsModal: () => void;
}

export default function ReactionActionsContainer(props: IProps) {
  const [{ currentUser }] = useContext(AppContext);
  const yourReaction = getUserPostReaction(props.reactions, currentUser);

  return (
    <div className="ReactionActionsContainer flex flex-v-center">
      <Dropdown>
        <Dropdown.Toggle as={DropdownTriggerWithoutFormatting} id="add-reaction-dropdown">
          <AddReactionButton
            reactions={props.reactions}
            yourReaction={yourReaction}
          />
        </Dropdown.Toggle>

        <AddReaction showReset={!!yourReaction} />
      </Dropdown>

      {props.reactions && (
        <PostReactions
          reactions={props.reactions}
          openReactionsModal={props.openReactionsModal}
        />
      )}
    </div>
  )
}
