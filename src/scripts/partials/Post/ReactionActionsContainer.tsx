import React, { useContext } from 'react';
import { MinimalReactionCollectionInterface } from '../../types/ReactionInterface';
import AddReactionButton from './AddReactionButton';
import { Overlay, Popover } from 'react-bootstrap';
import { reactionOptions } from '../../../configs/config.json';
import AddReaction from './ActionModals/AddReaction';
import MinimalUserInterface from '../../types/MinimalUserInterface';
import AppContext from '../../AppContext';
import PostReactions from './PostReactions';

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
  reactionsOpen: boolean;
  setReactionsOpen: (open: boolean) => void;
  overlayRef: React.RefObject<HTMLDivElement>;
  openReactionsModal: () => void;
}

export default function ReactionActionsContainer(props: IProps) {
  const [{ currentUser }] = useContext(AppContext);
  const yourReaction = getUserPostReaction(props.reactions, currentUser);

  return (
    <div className="ReactionActionsContainer flex flex-v-center">
      <AddReactionButton
        reactions={props.reactions}
        reactionsOpen={props.reactionsOpen}
        setReactionsOpen={props.setReactionsOpen}
        yourReaction={yourReaction}
      />

      <Overlay
        show={props.reactionsOpen}
        onHide={() => props.setReactionsOpen(false)}
        placement="bottom-start"
        container={props.overlayRef.current}
        target={props.overlayRef.current}
      >
        <Popover
          id="reactions-popover"
          className="ReactionsPopover"
          data-reactions-count={Object.keys(reactionOptions).length}
        >
          <AddReaction 
            showReset={!!yourReaction}
          />
        </Popover>
      </Overlay>

      {props.reactions && (
        <PostReactions
          reactions={props.reactions}
          setReactionsOpen={props.setReactionsOpen}
          openReactionsModal={props.openReactionsModal}
        />
      )}
    </div>
  )
}
