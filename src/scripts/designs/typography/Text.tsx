/** @jsx jsx */
import { jsx } from '@emotion/core';

const TEXT_VARIANTS = {
  time: { color: 'var(--primary-color)', fontSize: '0.8rem' },
};

interface IProps extends React.HTMLProps<HTMLDivElement> {
  variant: keyof typeof TEXT_VARIANTS;
}

export default function Text({ variant, ...props }: IProps) {
  return (
    <div css={TEXT_VARIANTS[variant]} {...props} />
  )
}