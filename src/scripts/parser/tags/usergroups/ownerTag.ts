import { ReactNode } from "react";

import UsergroupTag from "../../helpers/usergroupTag";

export default class OwnerTag extends UsergroupTag {
  render(): ReactNode {
    return super.render('owner');
  }
}