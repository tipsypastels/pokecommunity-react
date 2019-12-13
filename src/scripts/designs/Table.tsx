/** @jsx jsx */
import { jsx, css } from '@emotion/core';
import { HTMLProps, ReactNode } from 'react';

interface IProps extends HTMLProps<HTMLTableElement> {
  title: string;
  subtitle?: string;
  children: ReactNode;
}

export default function Table({ title, subtitle, children, ...props }: IProps) {
  return (
    <table 
      css={css`
        width: 100%;
        margin-bottom: 1rem;

        td, th {
          padding: 0.75rem;
          vertical-align: top;
          border-top: 1px solid #dee2e6;
          text-align: left;
        }
      `}
      {...props}
    >
      <thead>
        <tr>
          <th css={css`
            color: #495058;
            background-color: #e9ecef;
            border-color: #dee2e6;
          `}>
            <div>
              {title}
            </div>

            <small>
              {subtitle}
            </small>
          </th>
        </tr>
      </thead>

      <tbody>
        {children}
      </tbody>
    </table>
  );
}