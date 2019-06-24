import React, { Component } from 'react'
import { Container, Button } from 'react-bootstrap';

import '../../../../styles/modules/PagePartials/Errors/Err404.scss';

export default class Err404 extends Component {
  render() {
    return (
      <Container fluid className="Err404">
        <iframe
          className="video"
          width="560" 
          height="315" 
          src="https://www.youtube.com/embed/W2w22HrDNYI" 
          allow="
            accelerometer; 
            autoplay; 
            encrypted-media; 
            gyroscope; 
            picture-in-picture" 
          />

          <h1>
            A 404 in the words of brock: "we don't know where we are."
          </h1>

          <p>
            What ever you're looking for isn't here! But fear not — just turn back, or try searching for what you're looking for. If you think you've reached this page in error, contact us.
          </p>

          <Button variant="primary" href="/">
            Back Home
          </Button>
      </Container>
    )
  }
}
