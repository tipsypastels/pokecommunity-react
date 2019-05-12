import React, { ReactNode, Component } from 'react'
import { Container } from 'react-bootstrap';

import DefaultBanner from '../partials/Header/DefaultBanner';
import Omnibar from '../partials/Header/Omnibar';

import { PaginationInterface } from '../types/PaginationInterface';

import '../../styles/modules/Page.scss';

interface IProps {
  name: string;
  loading: boolean;
  children: ReactNode;
  banner?: string;
  pagination?: PaginationInterface[];
}

export default class Page extends Component<IProps> {
  render() {
    return (
      <div className={`Page ${this.props.name}Page`}>
        <Omnibar pagination={this.props.pagination} />
        {this.getBanner()}
        {this.getContent()}
      </div>
    )
  }

  getBanner() {
    if (this.props.banner) {
      return (
        <div 
          className="forum-banner"
          dangerouslySetInnerHTML={{ __html: this.props.banner }}
        />
      )
    }

    return <DefaultBanner />
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