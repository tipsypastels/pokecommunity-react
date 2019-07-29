import React, { Component, AnchorHTMLAttributes } from 'react';
import { Link } from 'react-router-dom';
import { pokecomm3RouteExists } from '../bridge/routeUtils';

export interface SmartLinkFormData {
  [key: string]: string | string[];
}

interface IProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  to: string;
  href?: never;
  method?: 'get' | 'post';
  formData?: SmartLinkFormData;
}

export default class SmartLink extends Component<IProps> {
  static defaultProps = {
    method: 'get',
  };

  /**
   * Sometimes, you have components that generate the links behind the scenes and won't support SmartLink - the prime example is bootstrap, which lets you pass in props of the style: 
   *  { href: 'path' }
   * or
   *  { as: Link, to: 'path' }
   * to deal with this syntax, we use the SmartLink.shim method, which will use the same logic to determine the type of link and generate the needed props. Note that this does not support the post request links as in <SmartLink />, but it shouldn't be necessary.
   * 
   * @param path The path to check type and generate a link for.
   * @return Valid props for bootstrap link components.
   */
  static shim(path: string): any {
    if (!path) {
      return {};
    }
    
    if (pokecomm3RouteExists(path)) {
      return { as: Link, to: path } as any;
    } else {
      return { href: path } as any;
    }
  }

  render() {
    const { 
      to, 
      method, 
      href, 
      children,
      formData,
      ...delegatedProps 
    } = this.props;

    const isPC3 = pokecomm3RouteExists(to);

    switch(true) {
      // This is an internal (React) link as a normal get request. Return <Link to />
      case isPC3 && method === 'get':
        return (
          <Link to={to} {...delegatedProps}>
            {children}
          </Link>
        );

      // This is an internal link, but we want to submit it as a post request. 
      // TODO Not sure how to handle this case yet. Look at how Rails does it?
      case isPC3 && method === 'post':
        return null;

      // This is an external or vbulletin link, which we have to use a regular HTML link to get to
      case !isPC3 && method === 'get':
        return (
          <a href={to} {...delegatedProps}>
            {children}
          </a>
        );

      // An external link that submits as a post request. To handle this we submit it as a form. Easy.
      case !isPC3 && method === 'post':
        const formRef = React.createRef<HTMLFormElement>();
        
        return (
          <form action={to} method="post" ref={formRef}>
            {this.getInputFromFormData()}

            <a
              href="#" 
              onClick={e => {
                e.preventDefault();
                formRef.current.submit();
                return false;
              }} 
              {...delegatedProps}
            >
              {children}
            </a>
          </form>
        );
    }
  }

  /**
   * Generates hidden <input> tags for the POST variants of <SmartLink />
   */
  getInputFromFormData() {
    const { formData } = this.props;
    if (!formData) {
      return null;
    }

    return Object.keys(formData).map(name => {
      const value = formData[name];
      if (Array.isArray(value)) {
        return value.map(val => (
          <input 
            key={`${name}[${value}]`}
            type="hidden"
            name={`${name}[${value}]`}
            value={value}
          />
        ));
      } else {
        return (
          <input
            key={name} 
            type="hidden"
            name={name}
            value={value}
          />
        )
      }
    })
  }
}