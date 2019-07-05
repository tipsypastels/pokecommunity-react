import React, { Component } from 'react';
import { Navbar } from 'react-bootstrap';

import CommunityMenuElement, { CommunityMenuElementProps } from './CommunityMenu/CommunityMenuElement';

import '../../../styles/modules/Header/CommunityMenu.scss';

//TODO add relevent links, change internal when needed
const communityMenuElemements: CommunityMenuElementProps[] = [
  {
    className: "cmenu-fourms",
    name: "Forums",
    link: "/",
    internal: false,
  },
  {
    className: "cmenu-seventh-gen",
    name: "Seventh Gen",
    link: "/forumdisplay.php?f=400",
    internal: false,
  },
  {
    className: "cmenu-daily",
    name: "Daily",
    link: "https://daily.pokecommunity.com/",
    internal: false,
  },
  {
    className: "cmenu-fan-games",
    name: "Fan Games",
    link: "/forumdisplay.php?f=289",
    internal: false,
  },
  {
    className: "cmenu-art",
    name: "Art",
    link: "/forumdisplay.php?f=21",
    internal: false,
  },
  {
    className: "cmenu-battle",
    name: "Battle",
    link: "http://pokecommunity.psim.us/",
    internal: false,
  },
  {
    className: "cmenu-discord",
    name: "Discord",
    link: "https://discord.gg/hpQpnzX",
    internal: false,
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
      <CommunityMenuElement
        key={element.className}
        className={element.className}
        name={element.name}
        link={element.link}
        internal={element.internal}
      />
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