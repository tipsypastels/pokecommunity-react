import React from 'react';
import Icon from '../Icon';

import '../../../styles/modules/Post/StaffPost.scss';

interface IProps {
  title: string;
  color: string;
  icon?: string;
  former: boolean;
}

function iconFor(icon?: string) {
  if (!icon) {
    return null;
  }

  if (icon.match(/^https:\/\//)) {
    return (
      <img 
        alt=""
        className="staffpost-image"
        src={icon}
      />
    );
  } else {
    return (
      <Icon.Dynamic from={icon} />
    );
  }
}

const StaffPost = ({ title, color, icon, former }: IProps) => (
  <div className="StaffPost" style={{ backgroundColor: color }}>
    {iconFor(icon)} {former && 'Former'} {title} Post
  </div>
)

export default StaffPost;