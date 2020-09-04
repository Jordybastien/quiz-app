import {
  RECORD_SERVICE_BOOKING,
  ADMIN_FETCH_BOOKINGS_BY_DATE,
} from './actionTypes';
import { recordBooking, fetchBookings } from '../services/booking';
import { fetchServices } from '../services/service';
import { getServices } from './service';
import { logError } from './error';
import { languages } from '../utils/languages';

const churchKey = 'ChurchService:Key';

const handleBooking = (booking) => {
  return {
    type: RECORD_SERVICE_BOOKING,
    booking,
  };
};

export const handleNewBooking = (booking) => {
  let used = 'en';
  let language = localStorage.getItem(churchKey);
  if (language) used = language;

  return async (dispatch) => {
    try {
      const newBooking = await recordBooking(booking);
      const services = await fetchServices();

      if (newBooking.responseCode === '103') {
        return dispatch(logError(newBooking.responseDecription));
      } else {
        return dispatch(getServices(services));
      }
    } catch (error) {
      return dispatch(
        logError(
          error.response ? error.response.data.message : languages[used].error
        )
      );
    }
  };
};

export const bookingsByDate = (bookings) => {
  return {
    type: ADMIN_FETCH_BOOKINGS_BY_DATE,
    bookings,
  };
};

export const handleFetchingBookings = (serviceID, serviceDate) => {
  return async (dispatch) => {
    return fetchBookings(serviceID, serviceDate).then((bookings) => {
      dispatch(bookingsByDate(bookings));
    });
  };
};
