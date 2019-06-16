import React from 'react';
import { Link } from 'react-router-dom';
import Tag from '../../core/tag';

import { isReactRoute } from '../../../bridge/reactRoute';
import { urlPattern } from '../../helpers/patterns';

class UrlTag extends Tag {
  render() {
    const { value, children } = this;
    let url;

    if (value.match(urlPattern)) {
      url = value;
    } else {
      url = '#';
    }

    if (isReactRoute(url)) {
      return (
        <Link to={url}>
          {children}
        </Link>
      );
    }

    return (
      <a href={url}>
        {children}
      </a>
    );
  }
}