import React from 'react';
import { ButtonToolbar, Button } from 'react-bootstrap';
import { When } from 'react-if';

import '../../../styles/modules/Post/PostFooter.scss';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faThumbsUp, 
  faShareSquare,
  faEdit,
  faCommentDots
} from '@fortawesome/pro-light-svg-icons';

interface IProps {
  canEdit: boolean;
  canSharePost: boolean;
  canRespond: boolean;
  canReactToPosts: boolean;
}

const PostFooter = ({ canEdit, canSharePosts, canReply, canReactToPosts }) => (
  <div className="PostFooter flex">
    <ButtonToolbar className="post-left-actions flex-grows">
      <When condition={canReactToPosts}>
        <Button className="menu-button" variant="link">
          <FontAwesomeIcon icon={faThumbsUp}/>
          <span>
            Like
          </span>
        </Button>
      </When>
      <When condition={canSharePosts}>
        <Button className="menu-button" variant="link">
          <FontAwesomeIcon icon={faShareSquare} />
          <span>
            Share
          </span>
        </Button>
      </When>
    </ButtonToolbar>
    <div className="post-right-actions">
      <When condition={canEdit}>
        <Button className="menu-button" variant="link">
          <FontAwesomeIcon icon={faEdit}/>
          <span>
            Edit
          </span>
        </Button>
      </When>
      <When condition={canReply}>
        <Button className="menu-button" variant="link">
          <FontAwesomeIcon icon={faCommentDots}/>
          <span>
            Respond
          </span>
        </Button>
      </When>
    </div>
  </div>
);

export default PostFooter;