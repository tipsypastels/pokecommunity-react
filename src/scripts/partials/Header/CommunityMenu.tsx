import React, { Component } from 'react';
import { Navbar } from 'react-bootstrap';

import SmartLink from '../SmartLink';

import '../../../styles/modules/Header/CommunityMenu.scss';

export interface CommunityMenuElementProps {
  className: string;
  name: string;
  link: string;
}

const communityMenuElemements: CommunityMenuElementProps[] = [
  {
    className: "cmenu-fourms",
    name: "Forums",
    link: "/",
  },
  {
    className: "cmenu-seventh-gen",
    name: "Seventh Gen",
    link: "/forumdisplay.php?f=400",
  },
  {
    className: "cmenu-daily",
    name: "Daily",
    link: "https://daily.pokecommunity.com/",
  },
  {
    className: "cmenu-fan-games",
    name: "Fan Games",
    link: "/forumdisplay.php?f=289",
  },
  {
    className: "cmenu-art",
    name: "Art",
    link: "/forumdisplay.php?f=21",
  },
  {
    className: "cmenu-battle",
    name: "Battle",
    link: "http://pokecommunity.psim.us/",
  },
  {
    className: "cmenu-discord",
    name: "Discord",
    link: "https://discord.gg/hpQpnzX",
  },

];

interface IState {
  mode: 'visible' | 'expanded' | 'hidden';
  scrollPosition: number;
}

class CommunityMenu extends Component<{}, IState> {
  constructor(props) {
    super(props);
    this.state = {
      mode: 'visible',
      scrollPosition: window.pageYOffset,
    }
  }

  render() {
    return (
      <Navbar
        className={`CommunityMenu ${this.state.mode}`}
        variant="dark"
        fixed="top"
      >
        <div
          className="d-block d-md-none pc-toggle"
          onClick={this.toggleExpanded}
        >
          Explore PokéCommunity
        </div>
        {this.renderCommunityMenu()}
      </Navbar>
    )
  }

  componentDidMount() {
    window.addEventListener("scroll", this.onScroll);
  }

  componentWillUnmount() {
    window.removeEventListener("scroll", this.onScroll);
  }

  renderCommunityMenu() {
    return communityMenuElemements.map(element => (
      <SmartLink to={element.link} className={`${element.className} cm-element`}>
        {element.name}
      </SmartLink>
    ))
  }

  toggleExpanded = () => {
    if (this.state.mode === 'visible') {
      this.setState({ mode: 'expanded' });
    } else {
      this.setState({ mode: 'visible' });
    }

  }

  onScroll = () => {
    let prevScroll = this.state.scrollPosition;
    let currentScroll = window.pageYOffset;
    let mode;
    if (prevScroll > currentScroll) {
      mode = 'visible';
    } else {
      mode = 'hidden';
    }
    this.setState({ scrollPosition: currentScroll, mode });
  }
}

export default CommunityMenu;