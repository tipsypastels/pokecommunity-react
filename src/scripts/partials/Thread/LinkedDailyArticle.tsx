import React from 'react';
import DailyArticleInterface from '../../types/DailyArticleInterface';
import Block from '../Block';
import Icon from '../Icon';
import { standardDateTime } from '../../helpers/DateHelpers';
import { Button } from 'react-bootstrap';

import { SlideDown } from 'react-slidedown';
import 'react-slidedown/lib/slidedown.css';

export default function LinkedDailyArticle(props: DailyArticleInterface) {
  // don't show drafts or other types of articles, even if they're linked
  if (props.status !== 'publish') {
    return null;
  }

  return (
    <React.Fragment>
      <a href={props.link} className="MobileLinkedDailyArticle d-md-none">
        Read Daily Article
      </a>

      <Block.Content className="LinkedDailyArticle d-none d-md-flex">
        <SlideDown className="article">
          {props.thumbnail && (
            <a href={props.link}>
              <img
                className="thumbnail"
                src={props.thumbnail}
                alt=""
              />
            </a>
          )}

          <div className="info">
            <a href={props.link} className="tagline">
              Linked article from PokéCommunity Daily
            </a>

            <a href={props.link}>
              <h3 className="title" 
                dangerouslySetInnerHTML={{ __html: props.title }}
              />
            </a>

            <div className="excerpt"
              dangerouslySetInnerHTML={{ __html: props.excerpt }}
            />

            <div className="metadata">
              <span className="author">
                Written by <a href={`https://daily.pokecommunity.com/author/${props.authorSlug}`}>{props.author}</a>
              </span>

              <span className="date">
                <Icon fw name="clock" group="far" mr={1} />
                {standardDateTime(props.date)}
              </span>
            </div>

            <Button href={props.link} variant="primary">
              Read Article
            </Button>
          </div>
        </SlideDown>
      </Block.Content>
    </React.Fragment>
  )
}
