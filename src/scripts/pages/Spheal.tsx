import React, { ReactNode, Component } from 'react'

interface IProps {
  name: string;
  loading: boolean;
  children: ReactNode;
  banner?: string;
}

export default class Spheal extends Component<IProps> {
  constructor(props) {
    super(props);
    console.log(props);
  }

  render() {
    if (this.props.loading) {
      return 'Loading...';
    }
    
    return (
      <img alt="spheal" src="https://pbs.twimg.com/media/D3yURVbUEAAJ6U0.jpg"/>
    )
  }
}