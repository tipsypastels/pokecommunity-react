import React, { Component } from 'react'
import { Container } from 'react-bootstrap';

import '../../../../styles/modules/PagePartials/Errors/Err404.scss';
import ErrorPage from './ErrorPage';

//TODO: link to error page doesn't seem to work, unknown if window.history.back() will actually pull back to the proper place.

export default class Err404 extends Component {
  render() {
    return (
      <Container fluid className="Err404">
        <ErrorPage>
          <div>
            A 404 error has occured.
             <div>
              What you searched for doesn't seem to exist. Try <span onClick={() => window.history.back()}>going back</span> a page.
             </div>
          </div>
        </ErrorPage>
      </Container>
    )
  }
}
