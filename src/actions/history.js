import { FETCH_HISTORY } from './actionTypes';
import { logError } from './error';
import { toastr } from 'react-redux-toastr';

export const getHistory = (history) => {
  return {
    type: FETCH_HISTORY,
    history,
  };
};
