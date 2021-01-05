import { showLoading, hideLoading } from './loading';
import { fetchStudents } from '../services/student';
import { fetchQuizes } from '../services/quiz';
import {
  findLevelById,
  fetchAllLevels,
  findStudentCourses,
} from '../services/level';
import { getQuizes, getNewLevelDetails, getNewLevelQuizes } from './quiz';
import { getLevelQuizes, getLevels } from './level';
import { getStudents } from './student';
import { fetchHistory } from '../services/history';
import { getHistory } from './history';
import { getCourses } from './courses';

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
      .then(({ students, levels, courses, levelQuizes, history }) => {
        dispatch(getStudents(students));
        dispatch(getLevels(levels));
        dispatch(getCourses(courses));
        dispatch(getHistory(history));
        dispatch(getNewLevelDetails(levelQuizes.level));
        dispatch(getNewLevelQuizes(levelQuizes.quizzes));
        dispatch(getLevelQuizes(levelQuizes));
        dispatch(hideLoading());
      })
      .catch(() => dispatch(hideLoading()));
  };
};

const getAuthedData = async (studentLevelId, studentId) => {
  const [students, levels, courses, history, levelQuizes] = await Promise.all([
    fetchStudents(),
    fetchAllLevels(),
    findStudentCourses(studentLevelId),
    fetchHistory(studentId),
    findLevelById(studentLevelId),
  ]);

  return {
    students,
    levels,
    levelQuizes,
    history,
    courses,
  };
};

