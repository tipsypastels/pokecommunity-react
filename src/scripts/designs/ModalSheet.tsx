/** @jsx jsx */
import { jsx } from '@emotion/core';
import { ReactNode } from 'react';
import { useMedia } from '../helpers/ResponsivenessHelpers';
import ModalSheetBrowser from './ModalSheet/ModalSheetBrowser';
import ModalSheetMobile from './ModalSheet/ModalSheetMobile';

const VARIANT_COLORS = {
  error: 'var(--error-color)',
  warning: 'var(--warning-color)',
}
type ModalSheetVariantColor = keyof typeof VARIANT_COLORS;

interface IProps {
  variant?: ModalSheetVariantColor;
  title: string;
  children: ReactNode;
  show: boolean;
  onHide: () => void;
  keyboard?: boolean;
  headerClassName?: string;
  headerContent?: ReactNode;
  closeButton?: boolean;
  bodyContainer?: ReactNode;
}
export type ModalSheetProps = IProps;

export default function ModalSheet(props: IProps) {
  const isLarge = useMedia('(min-width: 768px)');

  if (isLarge) {
    return <ModalSheetBrowser {...props} />;
  }

  return <ModalSheetMobile {...props} />;
}