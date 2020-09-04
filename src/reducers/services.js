import { FETCH_CHURCH_SERVICES } from '../actions/actionTypes';

export default function services(state = {}, action) {
  switch (action.type) {
    case FETCH_CHURCH_SERVICES:
      return {
        ...state,
        ...action.services,
      };
    default:
      return state;
  }
}
