import { FETCH_LEVEL_QUIZES } from './actionTypes';
import { logError } from './error';

export const getLevelQuizes = (levelQuizes) => {
  return {
    type: FETCH_LEVEL_QUIZES,
    levelQuizes,
  };
};
