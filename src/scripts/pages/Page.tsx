import React, { ReactNode, Component } from 'react'
import { Container } from 'react-bootstrap';

import DefaultBanner from '../partials/Header/DefaultBanner';
import Omnibar from '../partials/Header/Omnibar';

import { BreadcrumbInterface } from '../types/BreadcrumbInterface';

import '../../styles/modules/Page.scss';

interface IProps {
  name: string;
  loading: boolean;
  children: ReactNode;
  banner?: string;
  breadcrumbs?: BreadcrumbInterface[];
}

export default class Page extends Component<IProps> {
  render() {
    return (
      <div className={`Page ${this.props.name}Page`}>
        <Omnibar breadcrumbs={this.props.breadcrumbs} />
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