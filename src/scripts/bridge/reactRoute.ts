// Add new routes to here so auto generated bbcode + breadcrumbs use <Link to> rather than <a href>;

export const reactRouteList = [
  /threads\/\d+/,
  /docs\/bbcode/,
]

// TODO make this work for breadcrumbs
export function isReactRoute(route: string) {
  for (let match of reactRouteList) {
    if (route.match(match)) {
      return true;
    }
  }
  return false;
}