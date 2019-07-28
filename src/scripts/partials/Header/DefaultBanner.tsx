import React from 'react'
import { Link } from 'react-router-dom';

import brand from '../../../images/common/brand-transparent.png';
import brandText from '../../../images/common/brand-text.png';
import '../../../styles/modules/DefaultBanner.scss';

const DefaultBanner = () => (
  <Link to="/" className="DefaultBanner">
    <img className="brand" src={brand} alt="PokéCommunity Logo" />
    <img className="brand-text" src={brandText} alt="PokéCommunity Logo Text" />
  </Link>
);

export default DefaultBanner;