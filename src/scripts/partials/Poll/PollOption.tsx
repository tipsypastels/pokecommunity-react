import React, { useContext } from 'react'
import { PollOptionInterface } from '../../types/PollInterface';
import pluralize from 'pluralize';
import { Form } from 'react-bootstrap';
import SmartLink from '../SmartLink';

interface IProps {
  option: PollOptionInterface;
  index: number;
  totalVotes: number;
  canVote: boolean;
  selected: boolean;
  select: () => void;
  showingWhoVoted: boolean;
}

export default function PollOption(props: IProps) {
  const { 
    option, 
    index, 
    canVote, 
    totalVotes,
    selected,
    select,
    showingWhoVoted,
  } = props;
  
  const votes = option.votes.length;
  const perecentage = ((votes / totalVotes) * 100) || 0;

  const votePrompt = canVote
    ? (
      <Form.Check
        type="radio"
        name="optionnumber"
        value={index}
        checked={selected}
        onChange={e => {
          if (e.target.checked) {
            select();
          }
        }}
      />
    ) : null;

  const text = (
    <>
      <div className="title">
        {option.title}
      </div>

      <div className="breakdown">
        <span className="count">
          <span className="number">{votes}</span> {pluralize('vote', votes)}
        </span> / <span className="percentage">
          {perecentage}%
        </span>
      </div>
    </>
  );

  const whoVoted = showingWhoVoted && votes > 0
    ? (
      <div className="who-voted">
        <strong>
          Who Voted:
        </strong>

        {option.votes.map(vote => (
          <SmartLink 
            key={vote.user.id} 
            to={`/member.php?u=${vote.user.id}`}
          >
            {vote.user.username}
          </SmartLink>
        ))}
      </div>
    ) : null;
  
  // we actually display the option title in two places, one of them is on top of and clipped to the expanding colour bar. this ensures that as the bar expands, the text on top of it remains white
  return (
    <li className={`${canVote && 'votable'}`}>
      <label>
        {votePrompt}

        <div className="bar-borders">
          <div className="false-bar">
            <div className="text">
              {text}
            </div>
          </div>

          <div 
            className="votes-bar"
            style={{
              width: `${perecentage}%`,
            }}
          >
            <div className="text">
              {text}
            </div>
          </div>
        </div>
      </label>
      
      {whoVoted}
    </li>
  )
}
