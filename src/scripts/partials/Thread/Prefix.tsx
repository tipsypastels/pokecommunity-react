import React from 'react'
import PrefixInterface from '../../types/PrefixInterface';

interface IProps {
  prefix: PrefixInterface;
}

// TODO these also need to have an option for whether they should be filter links
export default function Prefix({ prefix }: IProps) {
  if (!prefix) { 
    return null;
  }

  if (prefix.richTitle) {
    return (
      <span 
        className="Prefix"
        dangerouslySetInnerHTML={{ __html: prefix.richTitle }}
      />
    );
  }

  if (prefix.plainTitle) {
    return <span className="Prefix">[{prefix.plainTitle}]</span>;
  }

  return null;
}
