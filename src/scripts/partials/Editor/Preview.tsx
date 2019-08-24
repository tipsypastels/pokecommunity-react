import React, { useContext } from 'react'
import Parser from '../../parser/Parser';
import AppContext from '../../AppContext';
import PreviewUser from './PreviewUser';

interface IProps {
  content: string;
  setMentions: (mentions: Set<string>) => void;
}

export default function Preview(props: IProps) {
  const mentions: Set<string> = new Set();
  
  const { currentUser } = useContext(AppContext);
  const userPreview = currentUser 
    ? (
      <PreviewUser user={currentUser} />
    ) : undefined;

  return (
    <>
      {userPreview}

      <Parser
        bbcode={props.content}
        hooks={{
          '@'({ children }) {
            mentions.add(children.toString());
          }
        }}
        done={() => props.setMentions(mentions)}
      />
    </>
  )
}