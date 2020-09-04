import { FETCH_STUDENTS } from '../actions/actionTypes';

export default function students(state = {}, action) {
  switch (action.type) {
    case FETCH_STUDENTS:
      return action.students;
    default:
      return state;
  }
}
