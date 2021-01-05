import { FETCH_USER_COURSES } from '../actions/actionTypes';

export default function courses(state = {}, action) {
  switch (action.type) {
    case FETCH_USER_COURSES:
      return action.courses;
    default:
      return state;
  }
}
