import { FETCH_STUDENTS, RECORD_STUDENT } from './actionTypes';
import { logError } from './error';
import { recordStudent } from '../services/student';
import { toastr } from 'react-redux-toastr';

export const getStudents = (students) => {
  return {
    type: FETCH_STUDENTS,
    students,
  };
};

export const newStudent = (student) => {
  return {
    type: RECORD_STUDENT,
    student,
  };
};

export const handleNewUser = (data) => {
  return async (dispatch) => {
    try {
      const user = await recordStudent(data);
      if (user.responseCode === '101') {
        return dispatch(logError(user.responseMessage));
      } else {
        toastr.success('Recorded', 'User Recorded Successfully');
        return dispatch(newStudent(data));
      }
    } catch (error) {
      toastr.error('Error', 'Failed to Record User, Please contact Us');
      return dispatch(logError('Failed to Record User, Please contact Us'));
    }
  };
};
