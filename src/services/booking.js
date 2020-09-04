import api from './api';

export const recordBooking = async (booking) => {
  const res = await api.post('/booking/create', booking);
  return res.data;
};

export const fetchBookings = async (serviceID, serviceDate) => {
  const res = await api.get(`/bookings/${serviceID}/${serviceDate}`);
  return res.data.meta.content;
};
