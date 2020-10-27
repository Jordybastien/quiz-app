import { FETCH_HISTORY } from '../actions/actionTypes';

export default function history(state = {}, action) {
  switch (action.type) {
    case FETCH_HISTORY:
      return action.history;
    default:
      return state;
  }
}
