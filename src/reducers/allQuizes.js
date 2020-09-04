import { FETCH_QUIZES } from '../actions/actionTypes';

export default function allQuizes(state = {}, action) {
  switch (action.type) {
    case FETCH_QUIZES:
      return action.allQuizes;
    default:
      return state;
  }
}
