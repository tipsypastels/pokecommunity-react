import { ReactNode } from "react";

import UsergroupTag from "../../helpers/usergroupTag";

class SupporterTag extends UsergroupTag {
  render(): ReactNode {
    return super.render('supporter');
  }
}

SupporterTag.vbCompatibleTag = false;
export default SupporterTag;