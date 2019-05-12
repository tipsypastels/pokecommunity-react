import React, { Component } from 'react'
import { Link } from 'react-router-dom';

import brand from '../../../images/common/brand-transparent.png';
import brandText from '../../../images/common/brand-text.png';
import '../../../styles/modules/DefaultBanner.scss';

const DefaultBanner = () => (
  <Link to="/" className="DefaultBanner">
    <img className="brand" src={brand} aria-hidden />
    <img className="brand-text" src={brandText} aria-hidden />
  </Link>
);

export default DefaultBanner;