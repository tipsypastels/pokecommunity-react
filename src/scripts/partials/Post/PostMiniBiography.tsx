import React from 'react';
import { When } from 'react-if';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faCalendarAlt,
  faMale, 
  faFemale, 
  faGenderless,
  faGlobe,
  faCircle as faCircleSolid,
  faCommentLines,
} from '@fortawesome/pro-solid-svg-icons';
import { faCircle as faCircleHollow } from '@fortawesome/pro-regular-svg-icons';

import MiniBiographyInterface from '../../types/MiniBiographyInterface';

const genderToIcon = (gender: string) => {
  return ({ male: faMale, female: faFemale})[gender.toLowerCase()] || faGenderless
}

const onlineToIcon = (lastOnline) => (
  lastOnline === 'Online now' ? faCircleSolid : faCircleHollow
);

const PostMiniBiography = (props: MiniBiographyInterface) => {
  let age         = null;
  let gender      = null; 
  let location    = null;
  let lastOnline  = null; 
  let lastPosted  = null;;

  if (props.age) {
    age = (
      <div>
        <FontAwesomeIcon icon={faCalendarAlt} />
        Age {props.age}
      </div>
    );
  }

  if (props.gender) {
    gender = (
      <div>
        <FontAwesomeIcon icon={genderToIcon(props.gender)} />
        {props.gender}
      </div>
    );
  }

  if (props.location) {
    location = (
      <div>
        <FontAwesomeIcon icon={faGlobe} />
        {props.location}
      </div>
    );
  }

  if (props.lastOnline) {
    lastOnline = (
      <div>
        <FontAwesomeIcon icon={onlineToIcon(props.lastOnline)} />
        {props.lastOnline}
      </div>
    );
  }

  if (props.lastPosted) {
    lastPosted = (
      <div>
        <FontAwesomeIcon icon={faCommentLines} />
        {props.lastPosted}
      </div>
    );
  }

  return (
    <div className="minibio">
      {age}
      {gender}
      {location}
      {lastOnline}
      {lastPosted}  
    </div>
  );
};

export default PostMiniBiography;