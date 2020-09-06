import { FETCH_LEVEL_QUIZES, RECORD_LEVEL } from './actionTypes';
import { logError } from './error';
import { toastr } from 'react-redux-toastr';
import { recordLevel } from '../services/level';

export const getLevelQuizes = (levelQuizes) => {
  return {
    type: FETCH_LEVEL_QUIZES,
    levelQuizes,
  };
};

export const newLevel = (level) => {
  return {
    type: RECORD_LEVEL,
    level,
  };
};

export const handleNewLevel = (data) => {
  return async (dispatch) => {
    try {
      const user = await recordLevel(data);
      if (user.responseCode === '101') {
        return dispatch(logError('Level Already Exist'));
      } else {
        toastr.success('Recorded', 'Level recorded Successfully');
        return dispatch(newLevel(data));
      }
    } catch (error) {
      toastr.error('Error', 'Level Already Exist');
      return dispatch(logError('Level Already Exist'));
    }
  };
};
