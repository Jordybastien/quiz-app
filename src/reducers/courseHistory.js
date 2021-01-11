import { FETCH_COURSE_HISTORY } from '../actions/actionTypes';

export default function courseHistory(state = {}, action) {
  switch (action.type) {
    case FETCH_COURSE_HISTORY:
      return action.courseHistory;
    default:
      return state;
  }
}
