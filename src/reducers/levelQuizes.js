import { FETCH_LEVEL_QUIZES, RECORD_LEVEL } from '../actions/actionTypes';

export default function levelQuizes(state = {}, action) {
  switch (action.type) {
    case FETCH_LEVEL_QUIZES:
      return action.levelQuizes;
    case RECORD_LEVEL:
      return {
        ...state,
        [state.length]: { ...action.level },
      };
    default:
      return state;
  }
}
