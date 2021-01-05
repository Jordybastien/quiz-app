import { FETCH_USER_COURSES } from './actionTypes';
import { logError } from './error';
import { toastr } from 'react-redux-toastr';
import { findLevelById } from '../services/level';
import { getNewLevelDetails, getNewLevelQuizes } from './quiz';
import { getLevelQuizes } from './level';

export const getCourses = (courses) => {
  return {
    type: FETCH_USER_COURSES,
    courses,
  };
};

export const handleFetchingQuizes = (levelId) => {
  return async (dispatch) => {
    try {
      const levelQuizes = await findLevelById(levelId);
      dispatch(getNewLevelDetails(levelQuizes.level));
      dispatch(getNewLevelQuizes(levelQuizes.quizzes));
      dispatch(getLevelQuizes(levelQuizes));
      return true;
    } catch (error) {
      toastr.error('Error', 'Failed to fetch Quizes');
      return dispatch(logError('Failed to fetch Quizes'));
    }
  };
};
