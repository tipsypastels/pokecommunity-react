import React, { ReactNode, useEffect, useContext } from 'react'
import { Container } from 'react-bootstrap';

import DefaultBanner from '../partials/Header/DefaultBanner';
import CommunityMenu from '../partials/Header/CommunityMenu';
import Omnibar from '../partials/Header/Omnibar';
import Footer from '../partials/Footer';

import Loading from '../partials/PagePartials/Loading';

import { BreadcrumbInterface } from '../types/BreadcrumbInterface';
import AppContext from '../AppContext';
import newcoreApi, { NewcoreErrorCode, ERROR_PAGES } from '../bridge/newcoreApi';
import { SearchScopeProps } from '../partials/Header/Omnibar/Tools/SearchPrompt';

interface IProps extends SearchScopeProps {
  name: string;
  loading: boolean;
  children: ReactNode;
  newBanner?: string;
  breadcrumbs?: BreadcrumbInterface[];
  htmlTitle?: string;
  error: NewcoreErrorCode;
}

export const baseTitle = 'The PokéCommunity Forums';

export default function Page(props: IProps) {
  const [{ banner, currentUser }, appDispatch] = useContext(AppContext);

  useEffect(() => {
    if (props.htmlTitle) {
      document.title = [props.htmlTitle, baseTitle].join(' - ');
    } else {
      document.title = baseTitle;
    }
  }, [props.htmlTitle]);

  useEffect(() => {
    if (props.loading || banner === props.newBanner) {
      return;
    }

    appDispatch({ type: 'SET_BANNER', banner: props.newBanner });
  }, [banner, appDispatch, props.newBanner, props.loading]);

  useEffect(() => {
    if (currentUser) {
      return;
    }

    (async () => {
      try {
        const response = await newcoreApi({
          method: 'get',
          url: '/auth/whoami',
          withCredentials: true,
        });

        const { user } = response.data;
        appDispatch({ type: 'SIGN_IN', user });
      } catch (e) {
        appDispatch({ type: 'SIGN_OUT' });
      }
    })();
  }, [props.name, currentUser, appDispatch]);

  const readyClass = props.loading
    ? 'is-loading'
    : 'is-ready';

  const contentHTML: ReactNode = (function() {
    if (props.error) {
      return ERROR_PAGES[props.error];
    }

    if (props.loading) {
      return <Loading />
    }

    return (
      <Container fluid>
        {props.children}
      </Container>
    )
  })();

  const bannerHTML: ReactNode = (function() {
    // error pages don't have banners
    if (props.error) {
      return null;
    }

    if (banner) {
      return (
        <div
          className="forum-banner"
          dangerouslySetInnerHTML={{ __html: banner }}
        />
      )
    }

    return <DefaultBanner />
  })();

  return (
    <div className={`Page ${props.name}Page ${readyClass}`}>
      <CommunityMenu />
      <Omnibar />

      {bannerHTML}
      {contentHTML}

      <Footer />
    </div>
  );
}