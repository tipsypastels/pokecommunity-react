import React, { Component } from 'react'
import { Container, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

import '../../../../styles/modules/PagePartials/Errors/Err404.scss';
import Icon from '../../Icon';

//TODO: link to error page doesn't seem to work, unknown if window.history.back() will actually pull back to the proper place.

export default class Err404 extends Component {
  render() {
    return (
      <Container fluid className="Err404">
        <div className="ErrorPage">
          <Icon className="error-icon" name="exclamation-triangle" size="lg" fw />
          <div className="error-subtitle">An error has occured!</div>
          <div className="error-message">
            <img src="https://i.imgur.com/9hUsWtN.png" alt="Red made an error!" className="error-image" />

            <div className="error-text">
              Red couldn't find the page you were looking for!
                <div>
                What you searched for doesn't seem to exist. Try <a className="link" onClick={() => window.history.back()}>going back</a> a page, or <a href="/search.php">search</a> for what you were looking for. If you think we should know what went wrong, feel free to <a href="/sendmessage.php">contact us</a>!
                </div>
            </div>
          </div>

          <Link to="/">
            <Button variant="primary" className="error-home">
              Home
          </Button>
          </Link>
        </div>
      </Container>
    )
  }
}
