import { showLoading, hideLoading } from './loading';
import { fetchStudents } from '../services/student';
import { fetchQuizes } from '../services/quiz';
import { findLevelById, fetchAllLevels } from '../services/level';
import { getQuizes } from './quiz';
import { getLevelQuizes, getLevels } from './level';
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
      .then(({ students, levels, levelQuizes }) => {
        dispatch(getStudents(students));
        dispatch(getLevels(levels));
        dispatch(getLevelQuizes(levelQuizes));
        dispatch(hideLoading());
      })
      .catch(() => dispatch(hideLoading()));
  };
};

const getAuthedData = async (studentLevelId) => {
  const [students, levels, levelQuizes] = await Promise.all([
    fetchStudents(),
    fetchAllLevels(),
    // TODO: Switch back studentLevelId
    findLevelById(4),
  ]);

  return {
    students,
    levels,
    levelQuizes,
  };
};
