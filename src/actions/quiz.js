import { FETCH_QUIZES } from './actionTypes';
import { logError } from './error';

export const getQuizes = (allQuizes) => {
  return {
    type: FETCH_QUIZES,
    allQuizes,
  };
};
