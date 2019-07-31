import React, { Component } from 'react'
import { Container } from 'react-bootstrap';

import '../../../../styles/modules/PagePartials/Errors/Err500.scss';

export default class Err500 extends Component {
  render() {
    return (
      <Container fluid className="Err500">
        <div className="error-message">
          <div className="error-text">
            <div className="main-text">
              Whoops! Something went wrong!
            </div>
            <div>
              It looks like a Rotom got into our systems. Try refreshing the page, or feel free to <a href="/sendmessage.php">contact us</a>!
            </div>
          </div>

          <img
            src="https://i.imgur.com/dpz4ihY.png" alt="There seems to be a bug in our systems!"
            className="error-image"
          />
        </div>
      </Container>
    )
  }
}
