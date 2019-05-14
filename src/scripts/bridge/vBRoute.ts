const vBRoutesList = {
  profile: userid => `/memberinfo.php?u=${userid}`,
};

export default function vBRoute(name, ...args) {
  if (process.env.NODE_ENV !== 'production') {
    console.warn(`Using a VB bridge route: ${name}. Be sure to remove all routes of this type when porting that page to React! When doing so you will also need to replace this <a href> with a <Link to> to stay within the SPA. This message will not show in production.`);
  }
  return vBRoutesList[name](...args);
}