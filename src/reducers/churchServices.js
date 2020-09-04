import { ADMIN_FETCH_CHURCH_SERVICES } from '../actions/actionTypes';

export default function churchServices(state = {}, action) {
  switch (action.type) {
    case ADMIN_FETCH_CHURCH_SERVICES:
      return {
        ...state,
        ...action.churchServices,
      };
    default:
      return state;
  }
}
