import { ReactNode } from "react";

import UsergroupTag from "../../helpers/usergroupTag";

export default class DailyTag extends UsergroupTag {
  render(): ReactNode {
    return super.render('daily');
  }
}