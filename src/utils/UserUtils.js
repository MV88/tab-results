// TODO implement this based on local token validity

export const isLoggedIn = (loggedUser = {}) => {
  return loggedUser?.accessToken;
}