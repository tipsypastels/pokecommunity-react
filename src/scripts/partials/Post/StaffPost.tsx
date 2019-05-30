import React from 'react';

import '../../../styles/modules/Post/StaffPost.scss';

interface IProps {
  title: string;
  color: string;
  // icon?: string; // TODO
  // TODO also former?
}

const StaffPost = ({ title, color }: IProps) => (
  <div className="StaffPost" style={{ backgroundColor: color }}>
    {title} Post
  </div>
)

export default StaffPost;