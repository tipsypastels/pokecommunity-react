import { ReactNode } from "react";

import UsergroupTag from "../../helpers/usergroupTag";

export default class FangamesTag extends UsergroupTag {
  render(): ReactNode {
    return super.render('fangames'); 
  }
}