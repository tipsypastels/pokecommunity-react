import React from 'react';
import BBCode from 'pokecommunity-bbcode';

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