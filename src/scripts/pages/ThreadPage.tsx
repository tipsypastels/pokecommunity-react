import React, { Component } from 'react'
import { RouteComponentProps } from 'react-router-dom';
import queryString from 'query-string';

import Page from './Page';
import ThreadHeader from '../partials/Thread/ThreadHeader';
import Viewing from '../partials/Viewing';
import QuickReply from '../partials/Thread/QuickReply';
import Pagination from '../partials/Pagination';

import ThreadInterface from '../types/ThreadInterface';

import { threadBreadcrumbs } from '../types/BreadcrumbInterface';
import { pageNumber } from '../helpers/PageHelpers';

import Post from '../partials/Post';
import NewPostModal from '../partials/NewPostModal';

interface IParams {
  threadid: string;
  page?: string;
}

type IProps = RouteComponentProps<IParams>;

interface IState {
  thread?: ThreadInterface;
  editorOpen: boolean;
  currentPage: number;
}

export default class ThreadPage extends Component<IProps, IState> {
  constructor(props) {
    super(props);
    let queryParams = queryString.parse(this.props.location.search);

    this.state = {
      thread: undefined,
      editorOpen: false,
      currentPage: pageNumber(queryParams.page),
    };
  }

  // this is just for testing the loading message
  // obviously make this an api request later
  componentWillMount() {
    setTimeout(() => {
      const thread = {
        threadid: 1,
        postuserid: 1,
        forumid: 1,
        open: true,
        views: 1,
        dateline: (new Date().getTime()),
        title: 'On Ducks and Spacetime',
        postusername: 'Rainbow',
        repliesCount: 1,
        canReply: true,
        canModerate: true,
        canReactToPosts: true,
        canSharePosts: true,
        totalPages: 1,
        poll: { 
          question: 'why are cats better than dogs?',
          type: 'Open',
          options: [
            {
              title: 'because they are great!',
              votes: [ 
                {
                  user: {
                    userid: 1,
                    username: 'Rainbow'
                  },
                },
                {
                  user: {
                    userid: 2,
                    username: 'Nina'
                  },
                },
                {
                  user: {
                    userid: 3,
                    username: 'Jake'
                  }
                }
              ],
            },
            {
              title: 'because they are soft',
              votes: [
                {
                  user: {
                    userid: 4,
                    username: 'Kitty'
                  }
                }, 
              ]
            }
          ]
        },

        forum: {
          forumid: 1,
          title: 'A Forum',
        },

        posts: [
          {
            postid: 1,
            threadid: 1,
            userid: 1,
            username: 'Rainbow',
            content: '[b]bold text![/b]',
            dateline: (new Date()).getTime(),
            canEdit: true,
            indexInThread: 1,

            user: {
              userid: 1,
              username: 'Rainbow',
              avatarURL: 'https://www.pokecommunity.com/customavatars/avatar210532_681.gif',
              postCount: 1,
              yearCount: 1,
              usertitleHTML: `<strong><font color="red">shine</font></strong>`,
              miniBiography: {
                age: 20,
                gender: 'Female',
                location: 'Skaia',
                lastOnline: 'Online now',
                lastPosted: 'Posted today',
              },
              postFlair: {
                avatar: {
                  border: '2px solid white',
                  boxShadow: '2px 1px 1px orange, 2px -1px 1px green, -2px 1px 1px blue, -2px -1px 1px purple',
                  margin: '0.05rem',
                  borderRadius: 3,
                },

                username: {
                  color: 'white',
                  fontWeight: 600,
                  fontSize: '1.5em',
                  textShadow: '2px 1px 1px orange, 2px -1px 1px green, -2px 1px 1px blue, -2px -1px 1px purple',
                },
              },
            },
          },

          
          {
            postid: 2,
            threadid: 1,
            userid: 2,
            username: 'Nina',
            content: 'bluh',
            dateline: (new Date()).getTime(),
            canEdit: false,
            indexInThread: 2,
            
            user: {
              userid: 2,
              username: 'Nina',
              avatarURL: 'https://www.pokecommunity.com/images/avatars/b2w2-trainers/Lady.gif',
              postCount: 2,
              yearCount: 2,
              miniBiography: {},
              postFlair: {
                main: {
                  background: 'linear-gradient(#e6cee6, transparent)',
                },
                
                avatar: {
                  backgroundColor: '#fff',
                  margin: '10px',
                  borderRadius: '50%',
                  border: '5px solid #e6cee6',
                },
                
                username: {
                  color: '#7b4a5a',
                  fontSize: '40px',
                  fontWeight: 200,
                },
              },
            },
          },

          {
            postid: 3,
            threadid: 1,
            userid: 3,
            username: 'Laslow',
            content: 'alas i like eggs on toast',
            dateline: (new Date()).getTime(),
            canEdit: false,
            indexInThread: 3,

            user: {
              userid: 3,
              username: 'Laslow',
              avatarURL: 'https://www.pokecommunity.com/customavatars/avatar5_9.gif',
              postCount: 18044,
              yearCount: 16.5,
              usertitleHTML: "That's Deneb, Altair, and Vega.",
              miniBiography: {
                gender: 'Male',
                location: 'Melbourne, Australia',
                lastOnline: 'Online now',
                lastPosted: 'Posted yesterday',
              },
              postFlair: {
                main: {
                  backgroundColor: '#2d3657',
                  backgroundImage: `url('https://dl.dropboxusercontent.com/s/9sjwsi5zxu9bikh/stunningstars.png?dl=0')`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                  color: 'white',
                  boxShadow: 'inset 0 0 30px rgba(255,255,255, 0.5)',
                  borderImage: 'linear-gradient(to bottom, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0.1) 100%)',
                  borderImageSlice: 3,
                  borderWidth: '8px',
                },

                avatar: {
                  borderRadius: '3px',
                  boxShadow: '0 0 0 3px rgba(255,255,255,0.3), 0 0 4px 2px #fff287',
                },

                username: {
                  color: '#fff287',
                  fontWeight: 100,
                  fontStyle: 'italic',
                  fontFamily: 'Flamenco, serif',
                },

                statistics: {
                  color: '#d0f5fa',
                  border: '1px solid',
                  padding: '10px',
                  borderRadius: '4px',
                  background: 'rgba(0, 0, 0, 0.1)',
                  boxShadow: '0 1px 3px rgba(0, 0, 0, 0.4)',
                  marginLeft: '10px',
                },

                miniBiography: {
                  color: '#fff8ca',
                  border: '1px solid',
                  padding: '10px',
                  borderRadius: '4px',
                  background: 'rgba(0, 0, 0, 0.1)',
                  boxShadow: '0 1px 3px rgba(0, 0, 0, 0.4)',
                }
              },
            },
          }
        ]
      };
      this.setState({ thread });
    }, 200);
  }

  render() {
    return (
      <Page
        name="Thread"
        loading={!this.state.thread}
        banner={this.state.thread && this.getBanner()}
        breadcrumbs={this.state.thread && this.getBreadcrumbs()}
      >
        {this.state.thread &&
          <div>
            {this.getNewPostModal()}
            {this.getHeader()}
            {this.getPagination()}
            {this.getPosts()}
            {this.getViewing()}
            {this.getQuickReply()}
          </div>
        }
      </Page>
    )
  }

  getNewPostModal() {
    if (!this.state.thread.canReply) {
      return null;
    }

    return (
      <NewPostModal
        show={this.state.editorOpen}
        thread={this.state.thread}
        closeModal={this.closeNewPostModal}
      />
    )
  }

  getPagination() {
    return (
      <Pagination 
        currentPage={this.state.currentPage}
        totalPages={this.state.thread.totalPages}
      />
    );
  }

  getBreadcrumbs() {
    return threadBreadcrumbs(this.state.thread);
  }

  getBanner() {
    return this.state.thread.banner;
  }

  getHeader() {
    return (
      <ThreadHeader
        threadid={this.state.thread.threadid}
        title={this.state.thread.title}
        views={this.state.thread.views}
        repliesCount={this.state.thread.repliesCount}
        canReply={this.state.thread.canReply}
        postusername={this.state.thread.postusername}
        dateline={this.state.thread.dateline}
        poll={this.state.thread.poll}
        openEditor={this.openNewPostModal}
      />
    );
  }

  getViewing() {
    return (
      <Viewing
        users={[]}
        guests={3}
        viewing="thread"
      />
    )
  }

  getPosts() {
    return this.state.thread.posts.map(post => (
      <Post key={post.postid} thread={this.state.thread} {...post} />
    ));
  }

  getQuickReply() {
    if (this.state.thread && this.state.thread.canReply) {
      return (
        <QuickReply />
      )
    }
  }

  openNewPostModal = () => {
    this.setState({ editorOpen: true });
  }

  closeNewPostModal = () => {
    this.setState({ editorOpen: false });
  }
}