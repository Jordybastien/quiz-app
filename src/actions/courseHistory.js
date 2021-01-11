import { FETCH_COURSE_HISTORY } from './actionTypes';
import { logError } from './error';
import { toastr } from 'react-redux-toastr';
import { fetchCourseHistory } from '../services/student';

export const getCourseHistory = (courseHistory) => {
  return {
    type: FETCH_COURSE_HISTORY,
    courseHistory,
  };
};

export const handleFetchingCourseHistory = (courseId) => {
  return async (dispatch) => {
    try {
      const courseHistory = await fetchCourseHistory(courseId);
      return dispatch(getCourseHistory(courseHistory));
    } catch (error) {
      toastr.error('Error', 'Failed to fetch course history');
      return dispatch(logError('Failed to fetch course history'));
    }
  };
};
