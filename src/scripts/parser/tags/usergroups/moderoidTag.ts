import { ReactNode } from "react";

import UsergroupTag from "../../helpers/usergroupTag";

export default class ModeroidTag extends UsergroupTag {
  render(): ReactNode {
    return super.render('moderoid');
  }
}