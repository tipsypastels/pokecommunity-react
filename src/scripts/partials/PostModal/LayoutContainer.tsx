import React from 'react';
import { EditorLayout } from '../PostModalLayout';
import TabbedLayout from './LayoutItems/TabbedLayout';
import RowsLayout from './LayoutItems/RowsLayout';
import ColumnsLayout from './LayoutItems/ColumnsLayout';
import UsergroupInterface from '../../types/UsergroupInterface';

export interface LayoutItemProps {
  content: string;
  setContent: (string, callback?: () => void) => void;
  setMentions: (mentions: Set<string>) => void;
  staffPostGroup: UsergroupInterface;
}

interface IProps extends LayoutItemProps {
  layout: EditorLayout;
}

export default function LayoutContainer(props: IProps) {
  const {
    layout,
    content, 
    setContent, 
    setMentions,
    staffPostGroup,
  } = props;

  const delegatedProps = { 
    content, 
    setContent, 
    setMentions,
    staffPostGroup,
  };
  
  switch(layout) {
    case 'tabbed': return <TabbedLayout {...delegatedProps} />
    case 'rows': return <RowsLayout {...delegatedProps} />
    case 'columns': return <ColumnsLayout {...delegatedProps} />
  }
}