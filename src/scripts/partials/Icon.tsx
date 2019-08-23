import React, { Component } from 'react'

export type ICON_GROUP = 'fas' | 'fab' | 'fal' | 'far';
export type ICON_SIZE = 'xs' | 'sm' | 'lg' | '2x' | '3x' | '5x' | '7x' | '10x';

interface IconNameProps {
  name: string;
  group?: ICON_GROUP;
}

interface DynamicIconNameProps {
  from: string;
}

interface MaybeIconNameProps {
  from: string | IconProps;
}

interface AdditionalIconProps {
  fw?: boolean;
  className?: string;
  transform?: string;
  mask?: string;
  size?: ICON_SIZE; 
  mr?: number;
}

export interface IconProps extends IconNameProps, AdditionalIconProps {}
export interface DynamicIconProps extends DynamicIconNameProps, AdditionalIconProps {}
export interface MaybeIconProps extends MaybeIconNameProps, AdditionalIconProps {}

/**
 * Used for generating an icon where the fa name "fas fa-heart" is all contained in one string. This will split it and automatically generate the <Icon /> tag.
 */

function Dynamic(props: DynamicIconProps) {
  let [group, name] = props.from.split(' ');
  return <Icon name={name} group={group as ICON_GROUP} {...props} />
}

/**
 * Used to generate an icon from a parameter that may just be a string (the icon name) or may be full icon props.
 */

function Maybe(props: MaybeIconProps) {
  if (typeof props.from === 'string') {
    return <Icon name={props.from} {...props} />;
  }  

  return <Icon {...props.from} {...props} />;
}

export default class Icon extends Component<IconProps> {
  static Dynamic = Dynamic;
  static Maybe = Maybe;

  static defaultProps = {
    fw: false,
    className: '',
    group: 'fas',
    transform: '',
    mask: '',
  };

  render() {
    let { 
      name, 
      size, 
      fw, 
      className, 
      group, 
      transform, 
      mask, 
      mr, 
    } = this.props;
    
    name = name.startsWith('fa-') 
      ? name 
      : `fa-${name}`;

    return (
      <i
        className={`
          icon
          ${group}
          ${name}
          ${fw && 'fa-fw'}
          ${size && `fa-${size}`}
          ${className}
          ${mr && `mr-${mr}`}
        `}
        data-fa-transform={transform}
        data-fa-mask={mask}
      />
    )
  }
}

// const Icon = ({ name, size, fw = false, className = '', group = 'fas', transform = '' }: IconProps) => (
//   <i 
//     className={`
//       ${group} 
//       fa-${name}
//       ${fw && 'fa-fw'}
//       ${size && `fa-${size}`}
//       ${className}
//     `}
//     data-fa-transform={transform}
//   />
// );

// export default Icon;