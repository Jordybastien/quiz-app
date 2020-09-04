import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import loading from './loading';
import error from './error';
import authedUser from './authedUser';
import link from './callBackLink';
import students from './students';
import allQuizes from './allQuizes';
import levelQuizes from './levelQuizes';

export default combineReducers({
  form: formReducer,
  loading,
  error,
  authedUser,
  link,
  students,
  allQuizes,
  levelQuizes,
});
