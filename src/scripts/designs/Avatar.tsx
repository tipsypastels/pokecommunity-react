/** @jsx jsx */
import { jsx } from '@emotion/core';
import SmartLink from '../partials/SmartLink';
import MinimalUserInterface from '../types/MinimalUserInterface';

const AVATAR_SIZES = {
  xsmall: 30, // editor preview
  small: 40, // on viewing lists and the omnibar
  smallish: 48, // notifications
  medium: 70, // not really anything? good intermediate tho
  large: 140, // on posts
}

type IProps = (
  | { for: MinimalUserInterface, alt?: string, link?: boolean }
  | { url: string, alt: string, link?: string }
) & {
  appearance?: 'circle' | 'square';
  size: keyof typeof AVATAR_SIZES;
  onClick?: (e: React.MouseEvent) => void;
}

// TODO default avatars
export default function Avatar(props: IProps) {
  const link = 'for' in props
    ? (props.link ? `/member.php?u=${props.for.id}` : undefined)
    : props.link;

  const alt = 'for' in props
    ? props.alt || `${props.for.username}'s Avatar`
    : props.alt;

  const url = 'for' in props
    ? props.for.avatar
    : props.url;

  const image = (
    <img
      css={{
        width: AVATAR_SIZES[props.size],
        height: AVATAR_SIZES[props.size],
        borderRadius: props.appearance === 'circle'
          ? '50%' : 'unset',
      }}
      src={url}
      alt={alt}
      onClick={props.onClick}
    />
  );

  if (!link) {
    return image;
  }

  return (
    <SmartLink to={link}>
      {image}
    </SmartLink>
  );
}

Avatar.defaultProps = {
  appearance: 'circle',
}