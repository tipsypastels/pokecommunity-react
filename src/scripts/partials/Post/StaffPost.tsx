import React from 'react';

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
        className="staffpost-image"
        src={icon}
      />
    );
  } else {
    return (
      icon
    );
  }
}

const StaffPost = ({ title, color, icon, former }: IProps) => (
  <div className="StaffPost" style={{ backgroundColor: color }}>
    {former && 'Former'} {title} Post
  </div>
)

export default StaffPost;