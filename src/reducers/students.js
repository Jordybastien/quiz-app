import {
  FETCH_STUDENTS,
  RECORD_STUDENT,
  ALTER_STUDENT_STATUS,
  UPDATE_STUDENT,
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
    case UPDATE_STUDENT:
      return {
        ...state,
        [action.recordIndex]: {
          ...action.student,
        },
      };
    default:
      return state;
  }
}
