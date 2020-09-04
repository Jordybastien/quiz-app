import { FETCH_CHURCHES, ADMIN_FETCH_CHURCH_SERVICES } from './actionTypes';

export const getChurches = (churches) => {
  return {
    type: FETCH_CHURCHES,
    churches,
  };
};

export const getChurchServices = (churchServices) => {
  return {
    type: ADMIN_FETCH_CHURCH_SERVICES,
    churchServices,
  };
};
