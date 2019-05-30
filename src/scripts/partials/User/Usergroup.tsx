import React from 'react';

import '../../../styles/modules/User/Usergroup.scss';

interface IProps {
  title: string;
  color: string;
}

const Usergroup = ({ title, color }: IProps) => (
  <div className="Usergroup" style={{ color, borderColor: color }}>
    {title}
  </div>
)

export default Usergroup;