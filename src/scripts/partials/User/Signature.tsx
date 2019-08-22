import React from 'react';
import Parser from '../../parser/Parser';

interface IProps {
  signature: string;
}

const Signature = ({ signature }: IProps) => (
  <div className="Signature">
    <Parser bbcode={signature} />
  </div>
)

export default Signature;