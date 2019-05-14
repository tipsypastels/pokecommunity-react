const vBRoutesList = {
  profile: userid => `/memberinfo.php?u=${userid}`,
};

export default function vBRoute(name, ...args) {
  if (process.env.NODE_ENV !== 'production') {
    console.log(`Using a VB bridge route: ${name}. Be sure to remove all routes of this type when porting that page to React! This message will not show in production.`);
  }
  return vBRoutesList[name](...args);
}