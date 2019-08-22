import React, { Component, ReactNode } from 'react';
import Page, { PageProps, PageError } from '../Page';
import TagModel from '../../parser/TagModel';
import BBCodeTag from '../../partials/Docs/BBCodeTag';
import Block from '../../partials/Block';
import { Form, Jumbotron, Button } from 'react-bootstrap';
import { TagList } from '../../parser/tags';
import { filterTags } from '../../parser/tagFunctions';

type IProps = PageProps;

interface IState {
  error: PageError;
  filter: string;
}

export default class BBCodePage extends Component<IProps, IState> {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      filter: '',
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
        {this.getHeader()}
        {this.getTagList()}
      </Page>
    );
  }

  getHeader() {
    return (
      <Block>
        <Block.Header className="flex flex-v-center">
          <h2 className="flex-grows">
            PokéCommunity Post Formatting
          </h2>

          <div>
            <Form.Control 
              placeholder="Filter Tags"
              value={this.state.filter} 
              onChange={e => this.setState({ filter: e.target.value })}
            />
          </div>
        </Block.Header>

        <Block.Content>
          PokéCommunity allows you to format your posts using <em>BBCode</em>, a tag-based language similar to HTML, but with a simplified syntax. Below is a list of usable tags.
        </Block.Content>
      </Block>
    )
  }

  getTagList(): ReactNode {
    const tags = this.getRelevantTags();
    if (Object.entries(tags).length === 0) {
      return this.filterNoResults();
    }

    return TagModel.map(
      tag => <BBCodeTag tag={tag} key={tag.name} />, tags,
    );
  }

  filterNoResults() {
    return (
      <Jumbotron>
        <h3>Sorry, no results!</h3>
        
        <Button variant="primary" onClick={() => this.setState({ filter: '' })}>
          Reset Search
        </Button>
      </Jumbotron>
    );
  }

  getRelevantTags(): TagList {
    return filterTags(this.state.filter);
  }
}