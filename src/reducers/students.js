import { FETCH_STUDENTS, RECORD_STUDENT } from '../actions/actionTypes';

export default function students(state = {}, action) {
  switch (action.type) {
    case FETCH_STUDENTS:
      return action.students;
    case RECORD_STUDENT:
      return {
        ...state,
        [state.length]: { ...action.student },
      };
    default:
      return state;
  }
}
