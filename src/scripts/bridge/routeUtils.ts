import { matchPath } from "react-router";
import { POKECOMM3_ROUTES } from "../App";

export function pokecomm3RouteExists(testedRoute: string): boolean {
  for (let route in POKECOMM3_ROUTES) {
    if (!!matchPath(testedRoute, { path: route, exact: true })) {
      return true;
    }
  }

  return false;
} 