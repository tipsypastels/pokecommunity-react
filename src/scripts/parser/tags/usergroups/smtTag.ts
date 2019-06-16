import { ReactNode } from "react";

import UsergroupTag from "../../helpers/usergroupTag";

export default class smtTag extends UsergroupTag {
  render(): ReactNode {
    return super.render('smt');
  }
}