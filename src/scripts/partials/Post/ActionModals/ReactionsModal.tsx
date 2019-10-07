import React, { useState, useEffect } from 'react';
import { Modal, Row, Col, Nav } from 'react-bootstrap';
import { Tab } from 'react-bootstrap';
import { reactionOptions } from '../../../../configs/config.json';
import { ReactionCollectionInterface } from '../../../types/ReactionInterface';
import newcoreApi from '../../../bridge/newcoreApi';
import Icon from '../../Icon';
import MinimalUser from '../../User/MinimalUser';
import Action from '../../Action';

interface IProps {
  postid: number;
  show: boolean;
  canModerate: boolean;
  closeModal: () => void;
}

export default function ReactionsModal(props: IProps) {
  const [decidingToRemoveAll, setDecidingToRemoveAll] = useState(false);
  const [reactions, setReactions] 
    = useState<ReactionCollectionInterface>(null);

  useEffect(() => {
    if (!reactions && props.show) {
      (async function() {
        const { data } = await newcoreApi({
          method: 'get',
          url: `/reactions/${props.postid}`,
        });

        setReactions(data);
      })();
    }
  }, [reactions, props.postid, props.show]);

  let content;
  if (reactions) {
    let listedReactionOptions = Object.keys(reactions);
    content = (
      <Tab.Container
        id="reactions-tabs"
        defaultActiveKey={Object.keys(reactionOptions)[0]}
      >
        <Row>
          <Col sm={3}>
            <Nav variant="pills" className="flex-column">
              {listedReactionOptions.map(option => (
                <Nav.Item key={option}>
                  <Nav.Link eventKey={option}>
                    <div className={`reaction reaction-${option}`} />
                  </Nav.Link>
                </Nav.Item>
              ))}
            </Nav>
          </Col>

          <Col sm={9}>
            <Tab.Content>

              {listedReactionOptions.map(option => (
                <Tab.Pane key={option} eventKey={option}>
                  {reactions[option].map(({ user }) => (
                    <MinimalUser key={user.id} {...user}>
                      {props.canModerate && (
                        <Icon name="trash-alt" group="fal" />
                      )}
                    </MinimalUser>
                  ))}
                </Tab.Pane>
              ))}
            </Tab.Content>
          </Col>
        </Row>
      </Tab.Container>
    );
  } else {
    content = (
      <Icon
        name="circle-notch"
        group="far"
        className="fa-spin"
      />
    );
  }

  return (
    <Modal
      dialogClassName="ReactionsModal modal-dialog-centered modal-dialog-scrollable"
      show={props.show}
      onHide={props.closeModal}
    >
      <Modal.Header closeButton>
        <Modal.Title>
          Reactions
        </Modal.Title>
      </Modal.Header>

      <Modal.Body>
        {content}
      </Modal.Body>

      {props.canModerate && (
        <Modal.Footer>

          {decidingToRemoveAll ? (
              <span className="mod-remove-all-confirm">
                are you sure? <span className="yes" onClick={() => console.log('removing all')}>yes</span> / <span className="no" onClick={() => setDecidingToRemoveAll(false)}>no</span>
              </span>
            ) : (
              <Action
                name="Remove all reactions"
                icon="dumpster-fire"
                activate={() => setDecidingToRemoveAll(true)}
              />
          )}
        </Modal.Footer>
      )}
    </Modal>
  );
}
