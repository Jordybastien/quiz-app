import { FETCH_LEVEL_QUIZES } from '../actions/actionTypes';

export default function levelQuizes(state = {}, action) {
  switch (action.type) {
    case FETCH_LEVEL_QUIZES:
      return action.levelQuizes;
    default:
      return state;
  }
}
