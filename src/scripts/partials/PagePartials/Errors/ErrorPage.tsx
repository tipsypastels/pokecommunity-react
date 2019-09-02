import React, { ReactNode } from 'react'
import { Container } from 'react-bootstrap';

interface IProps {
  title: string;
  subtitle: string;
  children: ReactNode;
  image: string;
  imageSmall?: string;
  imageTitle?: string;
}

export default function ErrorPage(props: IProps) {
  return (
    <Container fluid className="ErrorPage page-no-banner d-block d-md-flex">
      <div className="text-container">
        <h1>{props.title}</h1>
        <h3>{props.subtitle}</h3>

        {props.children}
      </div>

      <div className="image-container d-none d-md-block">
        <img src={props.image} title={props.imageTitle} />
      </div>

      {props.imageSmall && (
        <div className="d-block d-md-none text-center">
          <img src={props.imageSmall} title={props.imageTitle} />
        </div>
      )}
    </Container>
  );
}
