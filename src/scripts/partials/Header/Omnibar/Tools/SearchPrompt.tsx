import React, { useState } from 'react';
import OmnibarTool from './OmnibarTool';
import { Dropdown, Button } from 'react-bootstrap';
import { Form } from 'react-bootstrap';
import { ButtonGroup } from 'react-bootstrap';

export interface SearchScope {
  forumName?: string;
  threadName?: string;
}

export interface SearchScopeProps  {
  searchScope?: SearchScope;
}

// eventually we need to swap out a vB form for elasticsearch
// but that can wait
export default function SearchPrompt(props: SearchScopeProps) {
  const { searchScope } = props;
  const [expanded, setExpanded] = useState<boolean>(false);
  const [scope, setScope] = useState<'site' | 'forum' | 'thread'>('site');

  const scopeTitle = ({
    'site': 'Search PokéCommunity',
    'forum': `Search ${searchScope && searchScope.forumName}`,
    'thread': `Search ${searchScope && searchScope.threadName}`,
  })[scope];

  // vb-ism. the names for the scope on vb don't match up with the ones
  // we're using here, drop this in elasticsearch of course
  const scopeFormName = ({
    'site': 'search-all',
    'forum': 'search-node',
    'thread': 'search-content',
  })[scope];

  function buttonType(activeScope: 'site' | 'forum' | 'thread') {
    return activeScope === scope
      ? 'primary'
      : 'outline-primary';
  }

  return (
    <OmnibarTool name="search-prompt" icon="search">
      <Dropdown.Header>
        <div className="search-label">
          Search
        </div>

        <Form className="search-menu" action="/search.php?do=process" method="post">
          <input
            type="hidden"
            name="searchScope"
            value={scopeFormName}
          />

          {searchScope && (
            <ButtonGroup className="scope-options">
              <Button 
                variant={buttonType('site')} 
                onClick={() => setScope('site')}
              >
                All Sections
              </Button>

              {searchScope.forumName && (
                <Button 
                  variant={buttonType('forum')}
                  onClick={() => setScope('forum')}
                >
                  This Forum
                </Button>
              )}

              {searchScope.threadName && (
                <Button 
                  variant={buttonType('thread')}
                  onClick={() => setScope('thread')}
                >
                  This Thread
                </Button>
              )}
            </ButtonGroup>
          )}

          <Form.Control
            name="query"
            placeholder={scopeTitle}
          />

          {expanded && <>
            <Form.Control 
              name="searchuser"
              placeholder="Search by member account name"
            />

            <Form.Control as="select" name="starteronly">
              <option value="0" selected>Posts by user</option>
              <option value="1">Threads by user</option>
            </Form.Control>

            <div className="flex">
              <Form.Control as="select" name="searchdate" className="flex-grows">
                <option value="0" selected>Posts from any date</option>
                <option value="lastvisit">Your last visit</option>
                <option value="1">Yesterday</option>
                <option value="7">A week ago</option>
                <option value="14">2 weeks ago</option>
                <option value="30">A month ago</option>
                <option value="90">3 months ago</option>
                <option value="180">6 months ago</option>
                <option value="365">A year ago</option>
                <option value="1095">3 years ago</option>
                <option value="1825">5 years ago</option>
              </Form.Control>

              <Form.Control as="select" name="before-after" className="flex-grows ml-1">
                <option value="after" selected>and newer</option>
                <option value="before">and older</option>
              </Form.Control>
            </div>
          </>}

          <ButtonGroup className="flex">
            <Button type="submit" variant="primary" className="flex-grows">
              Search
            </Button>

            {!expanded && (
              <Button 
                variant="light" 
                onClick={() => setExpanded(true)}
                className="flex-grows ml-1"
              >
                More Options
              </Button>
            )}
          </ButtonGroup>
        </Form>
      </Dropdown.Header>
    </OmnibarTool>
  );
}