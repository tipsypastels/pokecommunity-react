import { ReactNode } from "react";

import UsergroupTag from "../../helpers/usergroupTag";

export default class ModTag extends UsergroupTag {
  render(): ReactNode {
    return super.render('mod');
  }
}