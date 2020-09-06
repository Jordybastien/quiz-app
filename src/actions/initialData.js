import { showLoading, hideLoading } from './loading';
import { fetchStudents } from '../services/student';
import { fetchQuizes } from '../services/quiz';
import { findLevelById } from '../services/level';
import { getQuizes } from './quiz';
import { getLevelQuizes } from './level';
import { getStudents } from './student';

const getInitialData = async () => await fetchQuizes();

export const handleInitialData = () => {
  return async (dispatch) => {
    dispatch(showLoading());
    return getInitialData()
      .then((quizes) => {
        dispatch(getQuizes(quizes));
        dispatch(hideLoading());
      })
      .catch(() => dispatch(hideLoading()));
  };
};

export const handleAuthedData = (studentLevelId) => {
  return async (dispatch) => {
    dispatch(showLoading());
    return getAuthedData(studentLevelId)
      .then(({ students, levelQuizes }) => {
        dispatch(getStudents(students));
        dispatch(getLevelQuizes(levelQuizes));
        dispatch(hideLoading());
      })
      .catch(() => dispatch(hideLoading()));
  };
};

const getAuthedData = async (studentLevelId) => {
  const [students, levelQuizes] = await Promise.all([
    fetchStudents(),
    //TODO: Change back to levelId
    findLevelById(4),
  ]);

  return {
    students,
    levelQuizes,
  };
};
