import Cookies from 'js-cookie';

import THEME_CONFIG from './THEME_CONFIG.json';

/*
  There are three ways we can get the current theme from a
  user's browser. First is localstorage, which we use for 3.0
  the second is via a cookie set by vBulletin, which sets
  the theme id. We don't use theme ids, so we translate them
  into slugs using the vB theme bridge. If the theme is supported
  in 3.0, yay! Otherwise it'll just drop down to the default
  case.
*/

function vbThemeBridge(): string | undefined {
  let themeid = Cookies.get(THEME_CONFIG.themeBridgeCookie);

  if (!themeid) {
    return;
  }

  return THEME_CONFIG.vbThemeBridge[themeid.toString()];
}

export function getCurrentTheme(): string {
  return localStorage.getItem(THEME_CONFIG.themeLocalstorageKey)
    || vbThemeBridge() || THEME_CONFIG.defaultTheme;
}