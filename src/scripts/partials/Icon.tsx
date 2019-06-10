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

interface AdditionalIconProps {
  fw?: boolean;
  className?: string;
  transform?: string;
  size?: ICON_SIZE; 
}

export type IconProps = IconNameProps & AdditionalIconProps;
export type DynamicIconProps = DynamicIconNameProps & AdditionalIconProps;

export interface MaybeIconProps {
  from: string | IconProps;
}

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

function Maybe({ from }: MaybeIconProps) {
  if (typeof from === 'string') {
    return <Icon name={from} />;
  }  

  return <Icon {...from} />;
}

export default class Icon extends Component<IconProps> {
  static Dynamic = Dynamic;
  static Maybe = Maybe;

  static defaultProps = {
    fw: false,
    className: '',
    group: 'fas',
    transform: '',
  };

  render() {
    let { name, size, fw, className, group, transform } = this.props;
    name = name.startsWith('fa-') 
      ? name 
      : `fa-${name}`;

    return (
      <i
        className={`
          ${group}
          ${name}
          ${fw && 'fa-fw'}
          ${size && `fa-${size}`}
          ${className}
        `}
        data-fa-transform={transform}
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