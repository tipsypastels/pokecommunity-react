/** @jsx jsx */
import { jsx, InterpolationWithTheme } from '@emotion/core';
import { capitalize } from '../../helpers/StringHelpers';

function mapGranularityToProperties(granularity: SpacingGranularity, prefix: string) {
  const result: InterpolationWithTheme<any> = {};

  Object.keys(granularity).forEach(key => {
    const value = typeof granularity[key] === 'number'
      ? granularity[key]
      : SPACING_SCALE[granularity[key]];

    switch(key) {
      case 'x': {
        result[`${prefix}Left`] = value;
        result[`${prefix}Right`] = value;
        break;
      }

      case 'y': {
        result[`${prefix}Top`] = value;
        result[`${prefix}Bottom`] = value;
        break;
      }

      default: {
        result[`${prefix}${capitalize(key)}`] = value;
      }
    }
  });

  return result;
}

const SPACING_SCALE = {
  small: '0.25rem',
  medium: '0.5rem',
  large: '1rem',
};

type SpacingValue = keyof typeof SPACING_SCALE | number;
type SpacingGranularity = Partial<{
  x: SpacingValue
  y: SpacingValue,
  left: SpacingValue,
  right: SpacingValue,
  top: SpacingValue,
  bottom: SpacingValue,
}>

interface IProps extends React.HTMLProps<HTMLDivElement> {
  margin?: SpacingGranularity,
  padding?: SpacingGranularity,
  borderBox?: boolean;
}

export default function Spacing({ margin, padding, borderBox, ...props }: IProps) {
  const css: InterpolationWithTheme<any> = {};
  
  if (borderBox) {
    css.boxSizing = 'border-box';
  }

  if (margin) {
    Object.assign(css, mapGranularityToProperties(margin, 'margin'))
  }

  if (padding) {
    Object.assign(css, mapGranularityToProperties(padding, 'padding'));
  }

  return (
    <div 
      css={css}
      {...props}
    />
  );
}
