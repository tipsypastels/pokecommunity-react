import React from 'react';
import SmartLink from '../../SmartLink';
import ErrorPage from './ErrorPage';

import NotFoundImage from '../../../../images/errors/notfound.png';
import NotFoundImageSmall from '../../../../images/errors/notfound_small.png';

export default function Err404() {
  return (
    <ErrorPage 
      title="Huh?" 
      subtitle="We're not sure what you're looking for, but it's not here." image={NotFoundImage}
      imageSmall={NotFoundImageSmall}
      imageTitle="Psyduck is as confused as you are..."
    >
      <div className="links">
        <div className="lead">
          One of these links might help you out:
        </div>
        
        <ul>
          <li><SmartLink to="/">Home</SmartLink></li>
          <li><SmartLink to="/search.php">Search</SmartLink></li>
          <li><SmartLink to="/faq.php">Help</SmartLink></li>
        </ul>
      </div>

      <div className="contact">
        <span className="lead">Think this might be a mistake?</span> Post a thread in <SmartLink to="forumdisplay.php?fn=support">Feedback & Support</SmartLink> or drop a message on our <a href="https://discord.gg/hpQpnzX">Discord server</a>!
      </div>
    </ErrorPage>
  );
}