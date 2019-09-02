import React, { ReactNode, Component } from 'react'
import { Container } from 'react-bootstrap';

import DefaultBanner from '../partials/Header/DefaultBanner';
import CommunityMenu from '../partials/Header/CommunityMenu';
import Omnibar from '../partials/Header/Omnibar';
import Footer from '../partials/Footer';

import Err404 from '../partials/PagePartials/Errors/Err404';
import Err500 from '../partials/PagePartials/Errors/Err500';
import Loading from '../partials/PagePartials/Loading';

import { BreadcrumbInterface } from '../types/BreadcrumbInterface';
import AppContext from '../AppContext';
import newcoreApi, { NewcoreErrorCode, ERROR_PAGES } from '../bridge/newcoreApi';
import { SearchScopeProps } from '../partials/Header/Omnibar/Tools/SearchPrompt';

export interface PageProps {
  appCurrentBanner: string | null;
  setAppBanner: (banner: string) => void;
}

interface IProps extends PageProps, SearchScopeProps {
  name: string;
  loading: boolean;
  children: ReactNode;
  newBanner?: string;
  breadcrumbs?: BreadcrumbInterface[];
  htmlTitle?: string;
  error: NewcoreErrorCode;
}

export const baseTitle = 'The PokéCommunity Forums';

export default class Page extends Component<IProps> {
  static contextType = AppContext;

  static defaultProps = {
    newBanner: null,
  };

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
        <CommunityMenu />
        <Omnibar 
          breadcrumbs={this.props.breadcrumbs} 
          searchScope={this.props.searchScope} 
        />
        
        {this.getBanner()}
        {this.getContent()}
        <Footer />
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
    const { appCurrentBanner, error } = this.props;

    // error pages don't have banners
    if (error) {
      return null;
    }

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
    const { error, loading, children } = this.props;

    if (error) {
      return ERROR_PAGES[error];
    }

    if (loading) {
      return <Loading />;
    }

    return (
      <Container fluid>
        {children}
      </Container>
    )
  }

  async whoAmI() {
    if (this.context.currentUser) {
      return;
    }

    try {
      const response = await newcoreApi({
        method: 'get',
        url: '/auth/whoami',
        withCredentials: true,
      });

      const user = response.data;
      this.context.setCurrentUser(user);
    } catch (e) {
      // KEEP it's fine to ignore this error, doesn't need to display to the user unless they're specifically trying to login/register imo
      this.context.setCurrentUser(null);
    }
  }
}