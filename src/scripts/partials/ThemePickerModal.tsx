import React, { Component } from 'react';
import AppContext from '../AppContext';
import { Modal, Nav } from 'react-bootstrap';

import { themes } from '../../configs/themes.json';

import '../../styles/modules/ThemePickerModal.scss';

interface IProps {
  show: boolean;
}

interface IState {
  variantFilter: null | 'light' | 'dark';
}

export default class ThemePickerModal extends Component<IProps, IState> {
  static contextType = AppContext;

  constructor(props) {
    super(props);
    this.state = {
      variantFilter: null,
    };
  }

  render() {
    return (
      <Modal 
        dialogClassName="ThemePickerModal modal-dialog-centered" 
        show={this.props.show}
        onHide={this.context.closeThemePicker}
      >
        <Modal.Header closeButton>
          <Modal.Title>
            <span className="d-none d-md-inline">PokéCommunity </span>Themes
          </Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <Nav variant="tabs">
            <Nav.Item>
              <Nav.Link
                active={this.state.variantFilter === null}
                onClick={this.filterCb(null)}
              >
                All Themes
              </Nav.Link>
            </Nav.Item>

            <Nav.Item>
              <Nav.Link
                active={this.state.variantFilter === 'light'}
                onClick={this.filterCb('light')}
              >
                Light Themes
              </Nav.Link>
            </Nav.Item>

            <Nav.Item>
              <Nav.Link
                active={this.state.variantFilter === 'dark'}
                onClick={this.filterCb('dark')}
              >
                Dark Themes
              </Nav.Link>
            </Nav.Item>
          </Nav>

          <div className="theme-list">
            {Object.keys(this.getThemesByFilter()).map(slug => {
              const theme = themes[slug];

              return (
                <div key={slug} className="theme" onClick={() => {
                  this.context.setTheme(slug);
                  this.context.closeThemePicker();
                }}>
                  <img
                    alt={`Preview of ${theme.name}`}
                    src={theme.image}
                  />

                  <div className="theme-label">
                    <strong>{theme.name}</strong> by {theme.author}
                  </div>
                </div>
              );
            })}
          </div>
        </Modal.Body>
      </Modal>
    )
  }

  filterCb(variantFilter: null | 'light' | 'dark') {
    return () => {
      this.setState({ variantFilter });
    }
  }

  getThemesByFilter() {
    const { variantFilter } = this.state;
    if (!variantFilter) {
      return themes;
    }

    const filteredThemes = {};
    for (let slug in themes) {
      if (themes[slug].variant === variantFilter) {
        filteredThemes[slug] = themes[slug];
      }
    }

    return filteredThemes;
  }
}
