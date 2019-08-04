import React, { Component } from 'react'
import { Container, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

//TODO: link to error page doesn't seem to work, unknown if window.history.back() will actually pull back to the proper place.

export default class Err404 extends Component {
  render() {
    return (
      <Container fluid className="Err404">
        <div className="error-message">
          <img src="https://i.imgur.com/9hUsWtN.png" alt="Red made an error!" className="error-image" />

          <div className="error-text">
            <div>
              <div className="main-text">
                Red couldn't find the page you were looking for!
                </div>
              <div>
                Try <span className="link" onClick={() => window.history.back()}>going back</span> a page, or <a href="/search.php">search</a> for what you were looking for. If you think we should know what went wrong, feel free to <a href="/sendmessage.php">contact us</a>!
                  </div>
            </div>
            <Link to="/">
              <Button variant="primary" className="error-home">
                Go Home
                </Button>
            </Link>
          </div>
        </div>
      </Container>
    )
  }
}
