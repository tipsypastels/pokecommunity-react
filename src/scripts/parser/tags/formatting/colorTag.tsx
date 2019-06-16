import React, { ReactNode } from 'react';
import Tag from '../../core/tag';

import { hexPatternWithoutHash } from '../../helpers/patterns';

class Color extends Tag {
  render(params: string): ReactNode {
    let color;

    if (color.match(hexPatternWithoutHash)) {
      color = `#${params}`;
    } else {
      color = params;
    }

    return (
      <span style={{ color }}>
        {this.children}
      </span>
    )
  }
}