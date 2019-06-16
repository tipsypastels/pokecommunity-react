import { ReactNode } from "react";

import UsergroupTag from "../../helpers/usergroupTag";

export default class DeveloperTag extends UsergroupTag {
  render(): ReactNode {
    return super.render('developer'); 
  }
}