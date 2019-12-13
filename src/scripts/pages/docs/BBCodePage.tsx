import React, { Component, ReactNode } from 'react';
import Page from '../Page';
import TagModel from '../../parser/TagModel';
import BBCodeTag from '../../partials/Docs/BBCodeTag';
import Block from '../../partials/Block';
import { Form, Jumbotron, Button } from 'react-bootstrap';
import { TagList } from '../../parser/tags';
import { filterTags } from '../../parser/tagFunctions';
import BBCodePlayground from '../../partials/BBCodePlayground';
import { NewcoreErrorCode } from '../../bridge/newcoreApi';

interface IState {
  error: NewcoreErrorCode;
  filter: string;
  playgroundOpen: boolean;
}

export default class BBCodePage extends Component<{}, IState> {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      filter: '',
      playgroundOpen: false,
    };
  }

  render() {
    return (
      <Page
        name="BBCode"
        loading={false}
        error={this.state.error}
      >
        {this.getPlayground()}
        {this.getHeader()}
        {this.getTagList()}
      </Page>
    );
  }

  getPlayground() {
    return (
      <BBCodePlayground
        show={this.state.playgroundOpen}
        close={() => this.setState({ playgroundOpen: false })}
      />
    )
  }

  getHeader() {
    return (
      <Block>
        <Block.Header className="flex flex-v-center">
          <h2 className="flex-grows">
            <span className="d-inline d-md-none">
              BBCode
            </span>
            
            <span className="d-none d-md-inline">
              PokéCommunity Post Formatting
            </span>
          </h2>

          <div className="d-none d-md-block">
            {this.getOptions()}
          </div>
        </Block.Header>

        <Block.Content>
          PokéCommunity allows you to format your posts using <em>BBCode</em>, a tag-based language similar to HTML, but with a simplified syntax. Below is a list of usable tags.
        </Block.Content>

        <Block.Footer className="d-block d-md-none">
          {this.getOptions()}
        </Block.Footer>
      </Block>
    )
  }

  getOptions() {
    return (
      <div className="flex">
        <Button 
          onClick={() => this.setState({ playgroundOpen: true })}
        >
          Try BBCode
        </Button>

        <Form.Control
          placeholder="Filter Tags"
          value={this.state.filter}
          onChange={e => this.setState({ filter: e.target.value })}
          className="ml-1"
        />
      </div>
    );
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