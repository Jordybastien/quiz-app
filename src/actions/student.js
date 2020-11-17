import {
  FETCH_STUDENTS,
  RECORD_STUDENT,
  ALTER_STUDENT_STATUS,
} from './actionTypes';
import { logError } from './error';
import { recordStudent } from '../services/student';
import { toastr } from 'react-redux-toastr';
import { alterStudent } from '../services/student';

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

export const handleStudentStatus = (student, status) => {
  return async (dispatch) => {
    try {
      const newStudent = await alterStudent(student.stdId, status);
      if (newStudent === 100) {
        const newStatusCode = status === 'activate' ? 1 : 0;
        dispatch(alterStudentStatus(student.recordIndex, newStatusCode));
        toastr.success(`${status}d`, `Student ${status}d successfully`);
        return true;
      }
      toastr.error('Error', `Failed to ${status} student`);
      return false;
    } catch (error) {
      toastr.error('Error', `Failed to ${status} Student`);
      return dispatch(logError(`Failed to ${status} Student`));
    }
  };
};

const alterStudentStatus = (recordIndex, newStatusCode) => {
  return {
    type: ALTER_STUDENT_STATUS,
    recordIndex,
    newStatusCode,
  };
};
