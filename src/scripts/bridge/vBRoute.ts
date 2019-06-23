const vBRoutesList = {
  profile: userid => `/memberinfo.php?u=${userid}`,
  sendPm: userid => `/private.php?do=newpm&u=${userid}`,
  searchUserPosts: userid => `/search.php?do=finduser&u=${userid}`,
  forums: slug => `/forumdisplay.php?fn=${slug}`,
  rules: `/rules`,
  moderationpolicy: `/rules/moderation-policy`,
  help: `/faq.php`,
  donations: `/donations`,
  donatenow: `/donations/donate`,
  promotedcontentmanager: `/servicepanel.php?do=newbuzzentry`,
  promotepost: postid => `/servicepanel.php?do=newbuzzentry&p=${postid}`,
};

let loggedRouteWarnings = [];

export default function vBRoute(name, ...args) {
  if (process.env.NODE_ENV !== 'production') {
    if (!loggedRouteWarnings.includes(name)) {
      console.log(`Using a VB bridge route: ${name}. Be sure to remove all routes of this type when porting that page to React! When doing so you will also need to replace this <a href> with a <Link to> to stay within the SPA. This message will not show in production.`);
  
      loggedRouteWarnings.push(name);
    }
  }

  const route = vBRoutesList[name];
  if (typeof route === 'function') {
    return route(...args);
  }
  return route;
}