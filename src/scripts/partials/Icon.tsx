import React from 'react'

export type ICON_GROUP = 'fas' | 'fab' | 'fal' | 'far';
export type ICON_SIZE = 'xs' | 'sm' | 'lg' | '2x' | '3x' | '5x' | '7x' | '10x';

export interface IconProps {
  name: string;
  group?: ICON_GROUP;
  fw?: boolean;
  className?: string;
  transform?: string;
  size?: ICON_SIZE; 
}

const Icon = ({ name, size, fw = false, className = '', group = 'fas', transform = '' }: IconProps) => (
  <i 
    className={`
      ${group} 
      fa-${name}
      ${fw && 'fa-fw'}
      ${size && `fa-${size}`}
      ${className}
    `}
    data-fa-transform={transform}
  />
);

export default Icon;