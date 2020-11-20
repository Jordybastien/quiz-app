import { FETCH_USER_HISTORY } from '../actions/actionTypes';

export default function userHistory(state = {}, action) {
  switch (action.type) {
    case FETCH_USER_HISTORY:
      return action.history;
    default:
      return state;
  }
}
