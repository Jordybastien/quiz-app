import { FETCH_QUIZES, RECORD_QUIZ, DELETE_QUIZ } from '../actions/actionTypes';

export default function allQuizes(state = {}, action) {
  switch (action.type) {
    case FETCH_QUIZES:
      return action.allQuizes;
    case RECORD_QUIZ:
      return {
        ...state,
        [state.length]: { ...action.quiz },
      };
    default:
      return state;
  }
}
