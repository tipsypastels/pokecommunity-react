import React, { Component } from 'react'
import { Container } from 'react-bootstrap';

import ErrorPage from './ErrorPage';

export default class Err500 extends Component {
  render() {
    return (
      <Container fluid className="Err404">
        <ErrorPage>
          <div>
            A 500 error has occured.
             <div>
            </div>
          </div>
        </ErrorPage>
      </Container>
    )
  }
}
