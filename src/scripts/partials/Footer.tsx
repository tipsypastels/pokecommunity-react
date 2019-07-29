import React, { Component } from 'react';
import { Button } from 'react-bootstrap';
import AppContext from '../AppContext';

import Icon from './Icon';

import { ReactComponent as FooterLogo } from '../../images/common/logo.php.svg';

import '../../styles/modules/Footer.scss';

class Footer extends Component {
  static contextType = AppContext;

  render() {
    return (
      <footer className="Footer">
        <div className="footer-branding">
          <FooterLogo className="footer-logo" />
          <div className="slogan">
            Working on a better slogan, 16 years and counting!
          </div>
        </div>
        <div className="footer-links">

          <div className="theme-select">
            <Button
              className="theme-button"
              variant="light"
              onClick={this.context.openThemePicker}
            >
              Change Theme
            </Button>
          </div>

          <div className="link-wrapper">
            <a href="/showgroups.php" className="link-background link-staff">
              <Icon name="hammer-war" size="lg" className="link-icon" fw />
            </a>
            Staff
          </div>

          <div className="link-wrapper">
            <a href="/rules" className="link-background link-rules">
              <Icon name="book" size="lg" className="link-icon" fw />
            </a>
            Rules
          </div>

          <div className="link-wrapper">
            <a href="/about" className="link-background link-about">
              <Icon name="info" size="lg" className="link-icon" fw />
            </a >
            About Us
          </div>

          <div className="link-wrapper">
            <a href="/sendmessage.php" className="link-background link-contact">
              <Icon name="paper-plane" size="lg" className="link-icon" fw />
            </a>
            Contact Us
          </div>
        </div>

        <div className="social-links">

          <a href="http://www.facebook.com/thePokeCommunity" className="social-facebook">
            <Icon name="facebook-f" group="fab" size="lg" fw className="link-icon" />
          </a>

          <a href="http://twitter.com/PokeCommunity" className="social-twitter">
            <Icon name="twitter" group="fab" size="lg" fw className="link-icon" />
          </a>

          <a href="https://www.instagram.com/thepokecommunity/" className="social-instagram">
            <Icon name="instagram" group="fab" size="lg" fw className="link-icon" />
          </a>

          <a href="https://www.youtube.com/c/pokecommunity" className="social-youtube">
            <Icon name="youtube" group="fab" size="lg" fw className="link-icon" />
          </a>

          <a href="http://feeds.feedburner.com/PokeCommunity" className="social-rss">
            <Icon name="rss" size="lg" fw className="link-icon" />
          </a>
        </div>


        <div className="footer-legal">
          <div>
            © 2002–2019 The PokéCommunity™, pokecommunity.com.
          </div>
          <div className="legal-links">
            Your use of PokéCommunity constitutes acceptance of our <a href="/about/legal">Services Agreement</a> and <a href="/about/privacy">Privacy Statement</a>.
          </div>
          <div className="aster">
            PokéCommunity Forums 2.0 “Aster”
          </div>
          <a href="/about/acknowledgements">Acknowledgements</a>
        </div>
      </footer>
    )
  }
}

export default Footer;