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
        key={category.id}
        id={category.id}
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
            description: "Planning and Development",
            viewers: 3,
            lastPostDate: 1541934671,
            lastPostUsername: "Careful With That Axe, Pichu",
            lastThreadTitle: "The longest test thread title in the world just for testing purposes hi",
            lastThreadId: 11,
            hasSubforums: true,
            hasThreads: true,
            subforums: [
              {
                id: 100,
                title: "Development Leader's Ship",
                icon: "https://www.pokecommunity.com/uploads/imageshare/5_1554965231988373939.jpg",
                description: "",
                viewers: 0,
                hasSubforums: false,
                hasThreads: false,
                canCreateThreads: true,
                canModerate: true,
              }
            ],
            canCreateThreads: true,
            canModerate: true,
          },
          {
            id: 1,
            title: "Staff Hub",
            icon: "https://www.pokecommunity.com/uploads/imageshare/12958_15558807151986269923.png",
            description: "PokéCommunity Staff",
            viewers: 0,
            lastPostDate: 1564942636,
            lastPostUsername: "Cherrim",
            lastThreadTitle: "Test Thread 1",
            lastThreadId: 40,
            hasSubforums: false,
            hasThreads: true,
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
            description: "Introduce Yourself",
            viewers: 10,
            lastPostDate: 1564662896,
            lastPostUsername: "Cherrim",
            lastThreadTitle: "Test Thread 11",
            lastThreadId: 11,
            hasSubforums: false,
            hasThreads: true,
            canCreateThreads: true,
            canModerate: true,
          },
          {
            id: 3,
            title: "PokéCommunity Discord",
            icon: "https://www.pokecommunity.com/images/forumicons/discord-icon.png",
            description: "Live Text and Voice Chat",
            viewers: 0,
            hasSubforums: true,
            hasThreads: false,
            canCreateThreads: true,
            canModerate: true,
            subforums: [
              {
                id: 101,
                title: "#pokemon-chit-chat",
                description: "",
                viewers: 0,
                hasSubforums: false,
                hasThreads: false,
                canCreateThreads: true,
                canModerate: true,
              },
              {
                id: 102,
                title: "#fangame-hub",
                icon: "https://www.pokecommunity.com/uploads/imageshare/5_1554965231988373939.jpg",
                description: "",
                viewers: 0,
                hasSubforums: false,
                hasThreads: false,
                canCreateThreads: true,
                canModerate: true,
              },
            ],
          }
        ]
      },
      {
        id: 2,
        title: "Banned Users",
        forums: [
          {
            id: 4,
            title: "Ban Appeals",
            description: "kthxbye",
            viewers: 0,
            hasSubforums: false,
            hasThreads: false,
            canCreateThreads: true,
            canModerate: true,
          },
        ]
      },
    ];
  }
}