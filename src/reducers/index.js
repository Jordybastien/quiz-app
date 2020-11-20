import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import loading from './loading';
import error from './error';
import authedUser from './authedUser';
import link from './callBackLink';
import students from './students';
import allQuizes from './allQuizes';
import levelQuizes from './levelQuizes';
import { reducer as toastrReducer } from 'react-redux-toastr';
import levels from './levels';
import newLevelDetails from './newLevelDetails';
import newLevelQuizes from './newLevelQuizes';
import history from './history';
import userHistory from './userHistory';

export default combineReducers({
  form: formReducer,
  toastr: toastrReducer,
  loading,
  error,
  authedUser,
  link,
  students,
  allQuizes,
  levelQuizes,
  levels,
  newLevelDetails,
  newLevelQuizes,
  history,
  userHistory,
});
