import { ReactNode } from "react";

import UsergroupTag from "../../helpers/usergroupTag";

export default class bssTag extends UsergroupTag {
  render(): ReactNode {
    return super.render('bss');
  }
}