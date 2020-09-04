import { ADMIN_FETCH_BOOKINGS_BY_DATE } from '../actions/actionTypes';

export default function bookings(state = {}, action) {
  switch (action.type) {
    case ADMIN_FETCH_BOOKINGS_BY_DATE:
      return {
        ...state,
        ...action.bookings,
      };
    default:
      return state;
  }
}
