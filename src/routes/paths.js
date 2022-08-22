function path(root, sublink) {
  return `${root}${sublink}`;
}

const ROOTS_AUTH = '/auth';
const ROOTS_DASHBOARD = '/dashboard';

export const PATH_AUTH = {
  root: ROOTS_AUTH,
  login: path(ROOTS_AUTH, '/login'),
  //   register: path(ROOTS_AUTH, '/register'),
  loginUnprotected: path(ROOTS_AUTH, '/login-unprotected'),
  //   registerUnprotected: path(ROOTS_AUTH, '/register-unprotected'),
  //   verify: path(ROOTS_AUTH, '/verify'),
  //   resetPassword: path(ROOTS_AUTH, '/reset-password'),
};

export const PATH_DASHBOARD = {
  root: ROOTS_DASHBOARD,
  general: {
    dashboard: path(ROOTS_DASHBOARD, '/app'),
    atm: path(ROOTS_DASHBOARD, '/atm'),
    crm: path(ROOTS_DASHBOARD, '/crm'),
    edc: path(ROOTS_DASHBOARD, '/edc'),
  },
};
