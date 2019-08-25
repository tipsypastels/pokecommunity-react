import React, { ReactNode } from 'react';

interface IProps {
  // children is NOT the list items, it's used
  // to add content above the list (like a title)
  children: ReactNode;
  className?: string;
  listItems: ReactNode[];
  noTigerStripe?: boolean;
}

/* alternative to Content */
const ListContent = (props: IProps) => (
  <div className={`
    BlockContent 
    BlockListContent 
    ${props.className || ''}
    ${props.noTigerStripe && 'no-tiger-stripe'}
  `}>
    <div className="children">
      {props.children}
    </div>

    <ul>
      {props.listItems}
    </ul>
  </div>
);

export default ListContent;