import React, { ReactNode, Component } from 'react'

interface IProps {
  name: string;
  loading: boolean;
  children: ReactNode;
  banner?: string;
}

export default class Page extends Component<IProps> {
  constructor(props) {
    super(props);
    console.log(props);
  }

  render() {
    if (this.props.loading) {
      return 'Loading...';
    }
    
    return (
      <div className={`${this.props.name}Page`}>
        {this.props.children}
      </div>
    )
  }
}
