import React from 'react';
import ErrorPage from './ErrorPage';

import NetworkErrorImage from '../../../../images/errors/networkerror.png';
import NetworkErrorImageSmall from '../../../../images/errors/networkerror_small.png'

export default function Err503() {
  return (
    <ErrorPage 
      title="Uh oh..." 
      subtitle="We can't seem to connect to PokéCommunity's server!" 
      image={NetworkErrorImage}
      imageSmall={NetworkErrorImageSmall}
      imageTitle="Magneton is here to fix it up!"
    >
      <div className="links">
        <div className="lead">
          Check these links for downtime announcements:
        </div>

        <ul>
          <li>
            <a href="https://twitter.com/pokecommunity">
              PokéCommunity Twitter
            </a>
          </li>
          <li>
            <a href="https://discord.gg/hpQpnzX">
              PokéCommunity Discord
            </a>
          </li>
        </ul>
      </div>

      <div className="contact">
        <span className="lead">No downtime announcement?</span> Please hop on the <a href="https://discord.gg/hpQpnzX">Discord server</a> and report the issue to a staff member. We'll fix it right up!
      </div>
    </ErrorPage>   
  );
}