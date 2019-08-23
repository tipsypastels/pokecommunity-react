import React from 'react';
import { EditorLayout } from '../PostModalLayout';
import TabbedLayout from './LayoutItems/TabbedLayout';
import RowsLayout from './LayoutItems/RowsLayout';
import ColumnsLayout from './LayoutItems/ColumnsLayout';

export interface LayoutItemProps {
  content: string;
  setContent: (string, callback?: () => void) => void;
  setMentions: (mentions: Set<string>) => void;
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
  } = props;

  const delegatedProps = { 
    content, 
    setContent, 
    setMentions,
  };
  
  switch(layout) {
    case 'tabbed': return <TabbedLayout {...delegatedProps} />
    case 'rows': return <RowsLayout {...delegatedProps} />
    case 'columns': return <ColumnsLayout {...delegatedProps} />
  }
}