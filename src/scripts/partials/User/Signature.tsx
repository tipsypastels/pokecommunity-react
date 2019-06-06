import React from 'react';
import BBCode from 'pokecommunity-bbcode';

import '../../../styles/modules/User/Signature.scss';

interface IProps {
  signature: string;
}

const Signature = ({ signature }: IProps) => (
  <div 
    className="Signature"
    dangerouslySetInnerHTML={{ 
      __html: BBCode.process({ text: signature }).html
    }}
  />
)

export default Signature;