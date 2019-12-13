/** @jsx jsx */
import { jsx } from '@emotion/core';

const GAP_SIZES = {
  small: 6,
  large: '0.5rem',
};

interface IProps extends React.HTMLProps<HTMLDivElement> {
  gap?: keyof typeof GAP_SIZES | number;
}

export default function SideBySide({ gap, ...props }: IProps) {
  return (
    <div css={{
      display: 'flex',
      alignItems: 'center',
      '& > *': {
        display: 'block',

        '&:not(:last-child)': {
          marginRight: typeof gap === 'number' ? gap : GAP_SIZES[gap],
        },
      },
    }} {...props} />
  );
}

SideBySide.defaultProps = {
  gap: 'small',
};

SideBySide.Grow = function(props: React.HTMLProps<HTMLDivElement>) {
  return (
    <div css={{ flexGrow: 1 }} {...props} />
  );
}