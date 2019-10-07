import React, { useContext } from 'react';
import { MinimalReactionCollectionInterface } from '../../types/ReactionInterface';
import AppContext from '../../AppContext';
import { getUserPostReaction } from './ReactionActionsContainer';
import { Badge } from 'react-bootstrap';

interface IProps {
  reactions: MinimalReactionCollectionInterface;
  openReactionsModal: () => void;
}

export const PREVIEW_REACTION_ICONS_COUNT = 3;

export default function PostReactions(props: IProps) {
  const [{ currentUser }] = useContext(AppContext);
  const yourReaction = getUserPostReaction(props.reactions, currentUser);

  const sortedByPopularity = Object.keys(props.reactions)
    .sort((r1, r2) => {
      return props.reactions[r1].length - props.reactions[r2].length
    });

  // show the current user's reaction, and then the top 2 others next
  let shownReactions;
  if (yourReaction) {
    shownReactions = [yourReaction].concat(
      ...sortedByPopularity.filter(r => r !== yourReaction)
        .slice(0, PREVIEW_REACTION_ICONS_COUNT - 1)
    );
  } else {
    shownReactions = sortedByPopularity
      .slice(0, PREVIEW_REACTION_ICONS_COUNT);
  }

  const totalReactions = Object.values(props.reactions)
    .reduce((acc, current) => acc + current.length, 0);

  return (
    <Badge 
      pill variant="light" 
      className="PostReactions"
      onClick={props.openReactionsModal}
    >
      {shownReactions.map(reactionOption => (
        <div
          key={reactionOption} 
          className={`reaction reaction-${reactionOption}`} 
        />
      ))}

      <span className="number">
        {totalReactions}
      </span>
    </Badge>
  )
}
