import {
  FETCH_STUDENTS,
  RECORD_STUDENT,
  ALTER_STUDENT_STATUS,
} from '../actions/actionTypes';

export default function students(state = {}, action) {
  switch (action.type) {
    case FETCH_STUDENTS:
      return action.students;
    case RECORD_STUDENT:
      return {
        ...state,
        [state.length]: { ...action.student },
      };
    case ALTER_STUDENT_STATUS:
      return {
        ...state,
        [action.recordIndex]: {
          ...state[action.recordIndex],
          status: action.newStatusCode,
        },
      };
    default:
      return state;
  }
}
