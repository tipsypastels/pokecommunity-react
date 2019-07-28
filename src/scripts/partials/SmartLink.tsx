import React, { Component, AnchorHTMLAttributes } from 'react';
import { __RouterContext } from 'react-router';

interface IProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  to: string;
  href?: never;
}

export default class SmartLink extends Component<IProps> {
  static contextType = __RouterContext;

  // static for(href: string): 'a' | 'link' {
    
  // }

  render() {
    return null;
  }

  componentDidMount() {
    console.log(this.context.match);
  }
}