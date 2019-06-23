import React, { Component } from 'react';
import { EditorLayout } from '../NewPostModal';
import TabbedLayout from './LayoutItems/TabbedLayout';
import RowsLayout from './LayoutItems/RowsLayout';
import ColumnsLayout from './LayoutItems/ColumnsLayout';

export interface LayoutItemProps {
  content: string;
  setContent: (string, callback?: () => void) => void;
}

interface IProps extends LayoutItemProps {
  layout: EditorLayout;
}

export default function LayoutContainer(props: IProps) {
  const {
    layout,
    content, 
    setContent, 
  } = props;

  const delegatedProps = { content, setContent };
  switch(layout) {
    case 'tabbed': return <TabbedLayout {...delegatedProps} />
    case 'rows': return <RowsLayout {...delegatedProps} />
    case 'columns': return <ColumnsLayout {...delegatedProps} />
  }
}