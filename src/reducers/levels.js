import { FETCH_ALL_LEVELS, RECORD_LEVEL } from '../actions/actionTypes';

export default function levels(state = {}, action) {
  switch (action.type) {
    case FETCH_ALL_LEVELS:
      return action.levels;
    case RECORD_LEVEL:
      return {
        ...state,
        [state.length]: { ...action.level },
      };
    default:
      return state;
  }
}
