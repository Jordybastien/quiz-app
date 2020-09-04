import { FETCH_CHURCH_SERVICES } from './actionTypes';

export const getServices = (services) => {
  return {
    type: FETCH_CHURCH_SERVICES,
    services,
  };
};
