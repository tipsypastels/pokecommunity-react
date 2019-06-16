import { ReactNode } from "react";

import UsergroupTag from "../../helpers/usergroupTag";

export default class AdminTag extends UsergroupTag {
  render(): ReactNode {
    return super.render('admin'); 
  }
}