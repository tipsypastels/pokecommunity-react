import React, { Component } from 'react'

import Toolbar from './Editor/Toolbar';

import '../../styles/modules/Editor.scss';

interface IProps {
  content: string;
  setContent: (content: string, callback?: () => void) => void;
}

interface IState {
  textareaRef: React.RefObject<HTMLTextAreaElement>;
}

export default class Editor extends Component<IProps, IState> {
  constructor(props) {
    super(props);
    this.state = {
      textareaRef: React.createRef<HTMLTextAreaElement>(),
    };
  }

  render() {
    return (
      <div className="Editor">
        <Toolbar 
          content={this.props.content}
          setContent={this.props.setContent}
          textareaRef={this.state.textareaRef}
        />

        <textarea 
          className="Content"
          value={this.props.content}
          onChange={this.onChange}
          ref={this.state.textareaRef}
        />
      </div>
    )
  }

  onChange = (e: any) => {
    console.log(e);
    this.props.setContent(e.target.value, () => {
      const textarea = this.state.textareaRef.current;
      // have to change it to inherit first so it can recalculate
      // otherwise it will never shrink
      textarea.style.height = 'inherit';
      textarea.style.height = textarea.scrollHeight + 'px';
    });
  }
}