import React from 'react'
import Action from '../Action';
import { MinimalReactionCollectionInterface } from '../../types/ReactionInterface';
import { reactionOptions } from '../../../configs/config.json'

interface IProps {
  reactions: MinimalReactionCollectionInterface;
  yourReaction: string;
}

export default function AddReactionButton(props: IProps) {
  let activeProps = {
    className: `AddReactionButton ${props.reactions && 'has-reactions'} `,
  };

  if (props.yourReaction) {
    activeProps['className'] += `active active-${props.yourReaction}`;
    activeProps['name'] = reactionOptions[props.yourReaction].active;
    activeProps['icon'] = {
      name: reactionOptions[props.yourReaction].fa,
      group: 'fal',
    };
  } else {
    activeProps['name'] = 'React';
    activeProps['icon'] = { name: 'smile-plus', group: 'fal'}
  }

  return (
    <Action {...activeProps} internalName="react" />
  )
}
