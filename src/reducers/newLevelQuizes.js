import { FETCH_NEW_LEVEL_QUIZES } from '../actions/actionTypes';

export default function newLevelQuizes(state = {}, action) {
  switch (action.type) {
    case FETCH_NEW_LEVEL_QUIZES:
      return action.newLevelQuizes;
    default:
      return state;
  }
}
