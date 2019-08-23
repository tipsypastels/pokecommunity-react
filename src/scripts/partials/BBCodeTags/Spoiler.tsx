import React, { ReactNode } from 'react';
import {
  Accordion,
  AccordionItem,
  AccordionItemHeading,
  AccordionItemPanel,
  AccordionItemButton,
} from 'react-accessible-accordion';
import { Jumbotron } from 'react-bootstrap';

interface IProps {
  title?: string;
  children: ReactNode;
}

export default function Spoiler({ title = 'Spoiler', children }: IProps) {
  return (
    <Accordion allowZeroExpanded className="Spoiler">
      <AccordionItem>
        <AccordionItemHeading>
          <AccordionItemButton className="spoiler-toggle btn btn-outline-primary">
            {title}
          </AccordionItemButton>
        </AccordionItemHeading>

        <AccordionItemPanel>
          <Jumbotron className="spoiler-content">
            {children}
          </Jumbotron>
        </AccordionItemPanel>
      </AccordionItem>
    </Accordion>
  );
}
