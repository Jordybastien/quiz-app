import { FETCH_QUIZES, RECORD_QUIZ } from './actionTypes';
import { logError } from './error';
import { toastr } from 'react-redux-toastr';
import { recordQuiz } from '../services/quiz';

export const getQuizes = (allQuizes) => {
  return {
    type: FETCH_QUIZES,
    allQuizes,
  };
};

export const newQuiz = (quiz) => {
  return {
    type: RECORD_QUIZ,
    quiz,
  };
};

export const handleNewQuiz = (data) => {
  return async (dispatch) => {
    try {
      const user = await recordQuiz(data);
      if (user.responseCode === '101') {
        return dispatch(logError(user.responseMessage));
      } else {
        toastr.success('Recorded', 'Quiz recorded Successfully');
        return dispatch(newQuiz(data));
      }
    } catch (error) {
      toastr.error('Error', 'Failed to Record Quiz, Please contact Us');
      return dispatch(logError('Failed to Record Quiz, Please contact Us'));
    }
  };
};
