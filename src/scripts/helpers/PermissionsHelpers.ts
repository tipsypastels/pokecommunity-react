import CurrentUserInterface from "../types/CurrentUserInterface";
import GlobalUserPermissionsInterface from "../types/GlobalUserPermissionsInterface";

export function hasGlobalPerm(user: CurrentUserInterface, perm: keyof GlobalUserPermissionsInterface) {
  if (!user || !(perm in user.globalPermissions)) {
    return false;
  }

  return user.globalPermissions[perm];
}

export function hasAnyGlobalPerms(user: CurrentUserInterface) {
  if (user && user.globalPermissions) {
    return Object.values(user.globalPermissions).some(_ => _);
  }
  return false;
}