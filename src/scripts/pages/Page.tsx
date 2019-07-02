import React, { ReactNode, Component } from 'react'
import { Container } from 'react-bootstrap';

import DefaultBanner from '../partials/Header/DefaultBanner';
import Omnibar from '../partials/Header/Omnibar';

import Err404 from '../partials/PagePartials/Errors/Err404';
import Err500 from '../partials/PagePartials/Errors/Err500';
import Loading from '../partials/PagePartials/Loading';

import { BreadcrumbInterface } from '../types/BreadcrumbInterface';
import AppContext from '../AppContext';
import newcoreApi from '../bridge/newcoreApi';

import '../../styles/modules/Page.scss';

export type PageError = null | 404 | 500;

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
  error: PageError;
}

export const baseTitle = 'The PokéCommunity Forums';

export default class Page extends Component<IProps> {
  static contextType = AppContext;

  async componentDidMount() {
    this.setTitle();
    await this.whoAmI();
  }
  
  componentDidUpdate() {
    this.setTitle();
    this.setAppCurrentBanner();
  }
  
  render() {
    const readyClass = this.props.loading
      ? 'is-loading'
      : 'is-ready';

    return (
      <div className={`Page ${this.props.name}Page ${readyClass}`}>
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
    if (this.props.error === 404) {
      return <Err404 />;
    }

    if (this.props.error === 500) {
      return <Err500 />;
    }

    if (this.props.loading) {
      return <Loading />;
    }

    return (
      <Container fluid>
        {this.props.children}
      </Container>
    )
  }

  async whoAmI() {
    if (this.context.currentUser) {
      return;
    }

    try {
      const { status, data } = await newcoreApi({
        method: 'get',
        url: '/users/whoami',
      });

      let currentUser;
      if (status === 200) {
        currentUser = data;
      } else {
        currentUser = null;
      }

      this.context.setCurrentUser(currentUser);
    } catch(e) {
      // KEEP it's fine to ignore this error, doesn't need to display to the user unless they're specifically trying to login/register imo
      console.error(e)
    }
  }
}