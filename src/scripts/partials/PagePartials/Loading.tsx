import React from 'react';
import { Container } from 'react-bootstrap';

import Icon from '../Icon';

import '../../../styles/modules/PagePartials/Loading.scss';

const Loading = () => (
  <Container fluid className="Loading">
    <Icon 
      name="circle-notch"
      group="far"
      className="fa-spin"
    />
  </Container>
);

export default Loading;