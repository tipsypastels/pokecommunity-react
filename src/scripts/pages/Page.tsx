import React, { ReactNode, Component } from 'react'
import { Container } from 'react-bootstrap';

import Omnibar from '../partials/Header/Omnibar';

import '../../styles/modules/Page.scss';

interface IProps {
  name: string;
  loading: boolean;
  children: ReactNode;
  banner?: string;
}

export default class Page extends Component<IProps> {
  render() {
    return (
      <div className={`Page ${this.props.name}Page`}>
        <Omnibar />

        {this.getContent()}
      </div>
    )
  }

  getContent() {
    if (this.props.loading) {
      return 'Loading...';
    }

    return (
      <Container fluid>
        {this.props.children}
      </Container>
    )
  }
}