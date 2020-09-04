import { showLoading, hideLoading } from './loading';
import { getChurches, getChurchServices } from './church';
import { fetchChurches, fetchChurchServices } from '../services/church';

const getInitialData = async () => await fetchChurches();

export const handleInitialData = () => {
  return async (dispatch) => {
    dispatch(showLoading());
    return getInitialData()
      .then((churches) => {
        dispatch(getChurches(churches));
        dispatch(hideLoading());
      })
      .catch(() => dispatch(hideLoading()));
  };
};

export const handleChurchData = () => {
  return async (dispatch) => {
    dispatch(showLoading());
    return getChurchData()
      .then((churchServices) => {
        dispatch(getChurchServices(churchServices));
        dispatch(hideLoading());
      })
      .catch(() => dispatch(hideLoading()));
  };
};

const getChurchData = async () => await fetchChurchServices();
