export function hasAnyRole(userRoles = [], allowed = []) {
  if (!allowed.length) {
    return true;
  }

  return userRoles.some((r) => allowed.includes(r));
}
