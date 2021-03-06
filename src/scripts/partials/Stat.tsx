import React from 'react';
import pluralize from 'pluralize';

interface IProps {
  inline?: boolean;
  name: string;
  number: number;

  className?: string;
}

const Stat = (props: IProps) => (
  <div className={`Stat ${props.inline ? 'inline' : 'not-inline'} ${props.className || ''}`}>
    <div className="number">
      {props.number.toLocaleString()}
    </div>

    <div className="name">
      {pluralize(props.name, props.number)}
    </div>
  </div>
)

export default Stat;