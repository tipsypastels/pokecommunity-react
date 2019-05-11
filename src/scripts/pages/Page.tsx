import React, { ReactNode, Component } from 'react'

interface IProps {
  name: string;
  children: ReactNode;
}

export default class Page extends Component<IProps> {
  render() {
    return (
      <div className={`${this.props.name}Page`}>
        {this.props.children}
      </div>
    )
  }
}
