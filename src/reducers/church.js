import { FETCH_CHURCHES } from '../actions/actionTypes';

export default function churches(state = {}, action) {
  switch (action.type) {
    case FETCH_CHURCHES:
      return {
        ...state,
        ...action.churches,
      };
    default:
      return state;
  }
}
