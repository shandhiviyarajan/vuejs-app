//get Auth token//
export const getAuthToken = () => {
  let auth_token = localStorage.getItem("token");
  if (!!auth_token) {
    return auth_token;
  } else {
    return false;
  }
};

//get Refresh token
export const getRefreshToken = () => {
  let refresh_token = localStorage.getItem("refresh_token");
  if (!!refresh_token) {
    return refresh_token + "";
  } else {
    return false;
  }
};
