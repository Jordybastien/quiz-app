import { FETCH_HISTORY, FETCH_USER_HISTORY } from './actionTypes';
import { logError } from './error';
import { toastr } from 'react-redux-toastr';
import { fetchUserHistory } from '../services/history';

export const getHistory = (history) => {
  return {
    type: FETCH_HISTORY,
    history,
  };
};

export const fetchHistory = (history) => {
  return {
    type: FETCH_USER_HISTORY,
    history,
  };
};

export const handleUserHistory = (historyId) => {
  return async (dispatch) => {
    try {
      const history = await fetchUserHistory(historyId);
      if (history.responseCode === '100') {
        dispatch(fetchHistory(history.meta.details));
        return true;
      }
      return false;
    } catch (error) {
      toastr.error('Error', 'Failed to fetch History');
      return dispatch(logError('Failed to fetch History'));
    }
  };
};
