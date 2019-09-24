import React, { useContext, useState } from 'react';
import AppContext from '../AppContext';
import { Modal, Nav } from 'react-bootstrap';

import { themes } from '../../configs/themes.json';

export default function ThemePickerModal() {
  const { 
    themePickerOpen, 
    setThemePickerOpen, 
    setTheme, 
  } = useContext(AppContext);
  
  const [filter, setFilter] = useState<string>(null);

  const filteredThemes = (function() {
    if (!filter) {
      return themes;
    }

    const filteredThemes = {};
    for (let slug in themes) {
      if (themes[slug].variant === filter) {
        filteredThemes[slug] = themes[slug];
      }
    }
    return filteredThemes;
  })();

  return (
    <Modal
      dialogClassName="ThemePickerModal modal-dialog-centered"
      show={themePickerOpen}
      onHide={() => setThemePickerOpen(false)}
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
              active={filter === null}
              onClick={() => setFilter(null)}
            >
              All Themes
            </Nav.Link>
          </Nav.Item>

          <Nav.Item>
            <Nav.Link
              active={filter === 'light'}
              onClick={() => setFilter('light')}
            >
              Light Themes
            </Nav.Link>
          </Nav.Item>

          <Nav.Item>
            <Nav.Link
              active={filter === 'dark'}
              onClick={() => setFilter('dark')}
            >
              Dark Themes
            </Nav.Link>
          </Nav.Item>
        </Nav>

        <div className="theme-list">
          {Object.keys(filteredThemes).map(slug => {
            const theme = themes[slug];

            return (
              <div key={slug} className="theme" onClick={() => {
                setTheme(slug);
                setThemePickerOpen(false);
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
  );
}