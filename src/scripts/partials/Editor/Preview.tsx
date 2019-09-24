import React, { useContext } from 'react'
import Parser from '../../parser/Parser';
import AppContext from '../../AppContext';
import PreviewUser from './PreviewUser';
import UsergroupInterface from '../../types/UsergroupInterface';
import StaffPost from '../Post/StaffPost';

interface IProps {
  content: string;
  setMentions: (mentions: Set<string>) => void;
  staffPostGroup: UsergroupInterface;
}

export default function Preview(props: IProps) {
  const mentions: Set<string> = new Set();
  
  const [{ currentUser }] = useContext(AppContext);
  const userPreview = currentUser 
    ? (
      <PreviewUser user={currentUser} />
    ) : null;

  const staffPostPreview = props.staffPostGroup
      ? (
        <StaffPost 
          title={props.staffPostGroup.singularTitle} 
          color={props.staffPostGroup.color} 
          icon={props.staffPostGroup.icon}
          former={false} 
          className="mb-2"
        />
      ) : null;

  return (
    <>
      {userPreview}
      {staffPostPreview}

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