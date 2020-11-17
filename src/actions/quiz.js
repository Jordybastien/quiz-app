import {
  FETCH_QUIZES,
  RECORD_QUIZ,
  FETCH_NEW_LEVEL_DETAILS,
  FETCH_NEW_LEVEL_QUIZES,
  DELETE_QUIZ,
} from './actionTypes';
import { logError } from './error';
import { toastr } from 'react-redux-toastr';
import { recordQuiz, submitAnswers } from '../services/quiz';
import { checkUser, tokenKey } from '../services/auth';
import { deleteQuiz, fetchQuizes } from '../services/quiz';

export const getQuizes = (allQuizes) => {
  return {
    type: FETCH_QUIZES,
    allQuizes,
  };
};

export const getNewLevelDetails = (newLevelDetails) => {
  return {
    type: FETCH_NEW_LEVEL_DETAILS,
    newLevelDetails,
  };
};

export const getNewLevelQuizes = (newLevelQuizes) => {
  return {
    type: FETCH_NEW_LEVEL_QUIZES,
    newLevelQuizes,
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

export const handleSubmitQuiz = (data) => {
  return async (dispatch) => {
    try {
      const response = await submitAnswers(data);
      if (response.passed) {
        const user = checkUser();
        user.levelId = response.meta['New Level'];
        localStorage.setItem(tokenKey, JSON.stringify(user));
      }
      return response;
    } catch (error) {
      toastr.error('Error', 'Failed to Submit Quiz Answers, Please contact Us');
      return dispatch(
        logError('Failed to Submit Quiz Answers, Please contact Us')
      );
    }
  };
};

export const handleQuizDelete = (quiz) => {
  return async (dispatch) => {
    try {
      const newStudent = await deleteQuiz(quiz.QId);
      if (newStudent === 100) {
        dispatch(quizDelete(quiz.recordIndex));
        toastr.success('Deleted', 'Quiz Deleted Successfully');
        return true;
      }
      toastr.error('Error', 'Failed to delete quiz');
      return false;
      return true;
    } catch (error) {
      toastr.error('Error', 'Failed to delete quiz');
      return dispatch(logError('Failed to delete quiz'));
    }
  };
};

const quizDelete = (recordIndex) => {
  return {
    type: DELETE_QUIZ,
    recordIndex,
  };
};
