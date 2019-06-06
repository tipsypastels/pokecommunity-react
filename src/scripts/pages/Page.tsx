import React, { ReactNode, Component } from 'react'
import { Container } from 'react-bootstrap';

import DefaultBanner from '../partials/Header/DefaultBanner';
import Omnibar from '../partials/Header/Omnibar';

import { BreadcrumbInterface } from '../types/BreadcrumbInterface';

import '../../styles/modules/Page.scss';

export interface PageProps {
  appCurrentBanner: string | null;
  setAppBanner: (banner: string) => void;
}

interface IProps extends PageProps {
  name: string;
  loading: boolean;
  children: ReactNode;
  newBanner?: string;
  breadcrumbs?: BreadcrumbInterface[];
  htmlTitle?: string;
}

export const baseTitle = 'The PokéCommunity Forums';

export default class Page extends Component<IProps> {
  componentDidMount() {
    this.setTitle();
  }
  
  componentDidUpdate() {
    this.setTitle();
    this.setAppCurrentBanner();
  }
  
  render() {
    return (
      <div className={`Page ${this.props.name}Page`}>
        <Omnibar breadcrumbs={this.props.breadcrumbs} />
        
        {this.getBanner()}
        {this.getContent()}
      </div>
    )
  }

  setAppCurrentBanner() {
    const { 
      setAppBanner, 
      appCurrentBanner, 
      newBanner,
      loading
    } = this.props;

    if (loading || appCurrentBanner === newBanner) {
      return;
    }

    setAppBanner(newBanner);
  }
  
  setTitle() {
    if (this.props.htmlTitle) {
      document.title = [this.props.htmlTitle, baseTitle].join(' - ');
    } else {
      document.title = baseTitle;
    }
  }

  getBanner() {
    const { appCurrentBanner } = this.props;

    if (appCurrentBanner) {
      return (
        <div 
          className="forum-banner"
          dangerouslySetInnerHTML={{ __html: appCurrentBanner }}
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