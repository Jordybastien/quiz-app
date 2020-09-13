import { FETCH_NEW_LEVEL_DETAILS } from '../actions/actionTypes';

export default function newLevelDetails(state = {}, action) {
  switch (action.type) {
    case FETCH_NEW_LEVEL_DETAILS:
      return action.newLevelDetails;
    default:
      return state;
  }
}
