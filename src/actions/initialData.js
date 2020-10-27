import { showLoading, hideLoading } from './loading';
import { fetchStudents } from '../services/student';
import { fetchQuizes } from '../services/quiz';
import { findLevelById, fetchAllLevels } from '../services/level';
import { getQuizes, getNewLevelDetails, getNewLevelQuizes } from './quiz';
import { getLevelQuizes, getLevels } from './level';
import { getStudents } from './student';
import { fetchHistory } from '../services/history';
import { getHistory } from './history';

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

export const handleAuthedData = (studentLevelId, studentId) => {
  return async (dispatch) => {
    dispatch(showLoading());
    return getAuthedData(studentLevelId, studentId)
      .then(({ students, levels, levelQuizes, history }) => {
        dispatch(getStudents(students));
        dispatch(getLevels(levels));
        dispatch(getNewLevelDetails(levelQuizes.level));
        dispatch(getNewLevelQuizes(levelQuizes.quizzes));
        dispatch(getLevelQuizes(levelQuizes));
        dispatch(getHistory(history));
        dispatch(hideLoading());
      })
      .catch(() => dispatch(hideLoading()));
  };
};

const getAuthedData = async (studentLevelId, studentId) => {
  const [students, levels, levelQuizes, history] = await Promise.all([
    fetchStudents(),
    fetchAllLevels(),
    findLevelById(studentLevelId),
    fetchHistory(studentId),
  ]);

  return {
    students,
    levels,
    levelQuizes,
    history,
  };
};
