export const AUTH = {
  LOGIN: "/v1/authenticate/login",
  REGISTER: "/v1/authenticate/signUp",
  NEW_ACCESS_TOKEN: "/v1/authenticate/refreshToken",
  FORGOT_PASSWORD: "/v1/authenticate/forgetPassword",
  RESET_PASSWORD: "/v1/authenticate/changePassword",
  RESEND_VERIFICATION: "/v1/auth/resendVerificationCode",
  CONFIRM_FORGOT_PASSWORD: "/v1/authenticate/confirmForgetPassword",
  GET_PROFILE: "/v1/authenticate/profile/me",
  UPDATE_PROFILE: "/v1/authenticate/profile/", //id required
  IMAGE_UPLOAD: "/v1/authenticate/user/image/upload",
};
export const USERS = {
  CREATE: "/v1/authenticate/signUp",
  GET_ADMIN: "/v1/authenticate/admin/list",
  GET_MERCHANT: "/v1/authenticate/merchant/list",
  GET_TECHNICIAL: "/v1/authenticate/technician/list",
  GET_END_USERS: "/v1/authenticate/enduser/list",
  DELETE: "/v1/authenticate/user/", // id
  UPDATE: "/v1/authenticate/profile/", //id
  SEARCH_ADMIN: "/v1/authenticate/admin/search", //query,
  SEARCH_MERCHANT: "/v1/authenticate/merchant/search", //query,
  SEARCH_TECHNICIAN: "/v1/authenticate/technician/search", //query,
  SEARCH_END_USERS: "/v1/authenticate/enduser/search", //query,
};

export const POWER_STATION = {
  CREATE: "/v1/power-station/create",
  GET: "/v1/power-station/", //Id
  GET_ALL: "/v1/power-station/all",
  UPDATE: "/v1/power-station/", //Id,
  DELETE: "/v1/power-station/", //Id
  SEARCH: "v1/power-station/list/search", //query,
  SYNC: "/v1/iot/sync/power-stations",
  ACTIVE: "/v1/iot/register/", //Id
  DEACTIVE: "/v1/iot/freeze/", //Id
  NOT_ASSIGNED: "/v1/power-station",
  DETACH: "/v1/power-station/detach/", // ID
};

export const LOCATION = {
  CREATE: "/v1/location/create", //id
  GET_ALL: "v1/location/all",
  UPDATE: "/v1/location/", //location_id,
  DELETE: "/v1/location/", //location_d
  GET_MERCHANT_LOCATION: "/v1/location/merchant/", //merchant_id
  GET_ONE: "/v1/location/", //location_id,
};

export const ACCESS = {
  //Roles
  CREATE_ROLE: "/v1/role/",
  GET_SINGLE_ROLE: "/v1/role/",
  GET_ALL_ROLES: "/v1/role/", //Id
  UPDATE_ROLE: "/v1/role/", //Id,
  DELETE_ROLE: "/v1/role/", //Id

  //Permissions
  GET_ALL_PERMISSIONS: "/v1/permission/"
};

export const ACCOUNTS = {

  WALLET_BALANCE:(merchant_id, page)=>`/v1/wallet/balance/${merchant_id}?page=${page}`,
  TRANSACTIONS:(merchant_id,page)=>`/v1/wallet/transactions/${merchant_id}?page=${page}`,
  ALL_REFUND: '/v1/refund/all',
  ALL_TRANSACTION: '/v1/wallet/transactions',
  REQUEST_REFUND: '/v1/refund/process',
  ALL_WITHDRAWN_BY_USER: '/v1/withdrawn/list/user/', // page & status
  ALL_WITHDRAWN: 'v1/withdrawn/list/', // page & status
  REQUEST_WITHDRAWN: '/v1/withdrawn/request',
  REQUEST_APPROVE_WITHDRAWN: '/v1/withdrawn/process',
  WITHDRAW_TO_MERCHANT: 'v1/withdrawn/transfer'
};
export const POWERBANKS = {
  ONGOING:(page)=>`/v1/powerbank/ongoing?page=${page}`
}
