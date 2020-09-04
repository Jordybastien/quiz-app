import { FETCH_STUDENTS } from './actionTypes';
import { logError } from './error';

export const getStudents = (students) => {
  return {
    type: FETCH_STUDENTS,
    students,
  };
};
