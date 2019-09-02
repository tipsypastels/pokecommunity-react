/* eslint-disable jsx-a11y/anchor-is-valid */

import React from 'react'
import ErrorPage from './ErrorPage';
import SmartLink from '../../SmartLink';

import ErrorImage from '../../../../images/errors/error.png';
import ErrorImageSmall from '../../../../images/errors/error_small.png';

export default function Err500() {
  return (
    <ErrorPage 
      title="That's weird." 
      subtitle="PokéCommunity experienced an error completing your request." image={ErrorImage}
      imageSmall={ErrorImageSmall}
      imageTitle="Don't be Gloomy, we'll get this figured out."
    >
      <div className="links">
        <div className="lead">
          We recommend that you create a thread in <SmartLink to="forumdisplay.php?fn=support">Feedback & Support</SmartLink>. You could also:
        </div>

        <ul>
          <li><SmartLink to="/">Go back home</SmartLink></li>
          <li><a href="#" onClick={() => window.location.reload()}>Reload the page</a></li>
        </ul>

        <div className="contact">
          <span className="lead">If the entire site is having issues,</span> please hop on our <a href="https://discord.gg/hpQpnzX">Discord server</a> and report the issue there. We'll get it fixed ASAP!
        </div>
      </div>
    </ErrorPage>
  )
}