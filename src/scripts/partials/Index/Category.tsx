import React, { Component } from 'react';
import Block from '../Block';
import CategoryInterface from '../../types/CategoryInterface';
import Forum from './Forum';
import SmartLink from '../SmartLink';
import Icon from '../Icon';

interface IState {
  collapsed: boolean;
}

function getInitialCollapsedState(categoryid: number) {
  let value = localStorage.getItem(`pokecomm3_category_${categoryid}_collapsed`); 
  return value === "true";
}

export default class Category extends Component<CategoryInterface, IState> {
  constructor(props) {
    super(props);
    this.state = {
      collapsed: getInitialCollapsedState(this.props.id),
    }
  }
    
  render() {
    return (
      <Block className="Category">
          <Block.Header>
            <div className="title">
              <h1>
                <SmartLink to={`/forumdisplay.php?f=${this.props.id}`}>
                  {this.props.title}
                </SmartLink>
              </h1>
              {this.getCollapseButton()} 
            </div>
          </Block.Header>

          {this.getForumContainer()}
      </Block>
    )
  }

  getForumContainer() {
    return (
      <div className=
        {this.state.collapsed ? "collapse" : "collapse.view"}
      > 
        <div className="forum-wrap">
          {this.getForums()}
        </div>
      </div>
    )
  }

  getForums() {
    return this.props.forums.map(forum => (
      <Forum key={forum.id} {...forum} />
    ));
  }

  getCollapseButton() {
    const { collapsed } = this.state;

    return (
      <div 
        className="collapse-button" 
        onClick={this.changeCollapsedState} 
        role="button" 
        aria-label={
          `${collapsed ? 'Uncollapse' : 'Collapse'} the ${this.props.title} category`
        }
      >
        <Icon 
          group="far" 
          name={collapsed ? "chevron-circle-down" : "chevron-circle-up"}
        />
      </div>
    )
  }

  changeCollapsedState = () => {
    this.setState(
      {collapsed: !this.state.collapsed},
      () => {
        // If collapsing a category, save to local storage. 
        // If expanding a category, clear local storage entry.
        if (this.state.collapsed) {
          localStorage.setItem(`pokecomm3_category_${this.props.id}_collapsed`, this.state.collapsed.toString())
        } else {
          localStorage.removeItem(`pokecomm3_category_${this.props.id}_collapsed`)
        }
      }
    );
  }
}