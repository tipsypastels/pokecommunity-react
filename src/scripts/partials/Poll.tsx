import React, { useState, useContext } from 'react'
import PollInterface from '../types/PollInterface';
import PollOption from './Poll/PollOption';
import Block from './Block';
import Icon from './Icon';
import AppContext from '../AppContext';
import { Button } from 'react-bootstrap';
import SmartLink from './SmartLink';

interface IProps {
  poll: PollInterface;
}

export function useCurrentUsersVote(poll: PollInterface) {
  const { currentUser } = useContext(AppContext);
  return (
    currentUser && 
      poll.options.find(option => (
        option.votes
          .map(vote => vote.user.id)
          .includes(currentUser.id)
      )
    )
  ) || null;
}

export default function Poll({ poll }: IProps) {
  const { currentUser } = useContext(AppContext);

  // TODO vote permissions
  const hasVotePermissions = !!currentUser;
  const canModeratePoll = !!currentUser;

  const currentUsersVote = useCurrentUsersVote(poll);

  // if they have permission to vote and haven't already voted
  const canVote = hasVotePermissions && !currentUsersVote;

  const [selectedIndex, setSelectedIndex] = useState<number>(null);
  const [showingWhoVoted, setShowingWhoVoted] = useState<boolean>(false);

  const options = poll.options.map((option, index) => {
    return (
      <PollOption  
        key={option.title}
        option={option}
        index={index}
        totalVotes={poll.voters}
        canVote={canVote}
        selected={selectedIndex === index}
        select={() => setSelectedIndex(index)}
        showingWhoVoted={showingWhoVoted}
      />
    )
  });

  let voteButton = null;
  if (canVote) {
    voteButton = (
      <Button
        type="submit"
        variant="primary"
        disabled={selectedIndex === null}
      >
        Vote
      </Button>
    );
  } else if (currentUsersVote) {
    voteButton = (
      <em>You have already voted for {currentUsersVote.title}</em>
    );
  }

  const editButton = canModeratePoll
    ? (
      <SmartLink to={`/poll.php?do=polledit&pollid=${poll.id}`}>
        Edit this Poll
      </SmartLink>
    ) : null;

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    // TODO
  }

  return (
    <Block.Content className="Poll">
      <form onSubmit={onSubmit}>
        <div className="desktop-flex flex-v-center">
          <h2 className="flex-grows">
            {poll.question}
          </h2>

          <small className="poll-type">
            <Icon fw name="chart-pie" mr={1} />
            {poll.public
              ? (
                <>
                  Public Poll

                  <span 
                    className="toggle-who-voted"
                    onClick={() => setShowingWhoVoted(!showingWhoVoted)}
                    role="button"
                  >
                    {showingWhoVoted ? 'Hide Who Voted' : 'Show Who Voted'}
                  </span>
                </>
              ) : (
                <>
                  Private Poll
                </>
              )
            }
          </small>
        </div>

        <ul>
          {options}
        </ul>

        <div className="flex flex-v-center">
          {voteButton}

          <div className="flex-grows" />

          {editButton}
        </div>
      </form>
    </Block.Content> 
  )
}
