import React, { ReactNode, Component } from 'react';

import Page, { PageProps, PageError } from './Page';
import BulletinBoard from '../partials/Index/BulletinBoard';

import CategoryInterface from '../types/CategoryInterface';
import Category from '../partials/Index/Category';

type IProps = PageProps;

interface IState {
  error: PageError;
  categories: CategoryInterface[];
}

export default class IndexPage extends Component<IProps, IState>
{
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      categories: this.fakeCategories(),
    }
  }

  render() {
    return (
      <Page
        name="Index"
        loading={false}
        appCurrentBanner={this.props.appCurrentBanner}
        setAppBanner={this.props.setAppBanner}
        error={this.state.error}
      >
        <div>
          <BulletinBoard />
          {this.getCategories()}
        </div>
      </Page>
    )
  }

  getCategories() {
    const { categories } = this.state;
    return categories.map(category => (
      <Category
        title={category.title}
        forums={category.forums}
      />
    ));
  }


  fakeCategories() {
    return [
      {
        id: 0,
        title: "Backstage",
        forums: [
          {
            id: 0,
            title: "Development Hub",
            icon: "https://www.pokecommunity.com/uploads/imageshare/5_15472757742105058674.png",
            canCreateThreads: true,
            canModerate: true,
          },
          {
            id: 1,
            title: "Staff Hub",
            icon: "https://www.pokecommunity.com/uploads/imageshare/12958_15558807151986269923.png",
            canCreateThreads: true,
            canModerate: true,
          },
        ]
      },
      {
        id: 1,
        title: "Community Square",
        forums: [
          {
            id: 2,
            title: "Meet and Greet",
            icon: "https://www.pokecommunity.com/images/forumicons/35.png",
            canCreateThreads: true,
            canModerate: true,
          },
        ]
      },
    ];
  }
}