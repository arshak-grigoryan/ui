import makeRequest from '../utils/makeRequest';

export const getReservations = (token, query) =>
  makeRequest(`reservations?${query}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

export const approveReservation = (token, id) =>
  makeRequest(`reservations/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json;charset=utf-8',
    },
    method: 'PUT',
    body: { status: 'approved' },
  });

export const rejectReservation = (token, id) =>
  makeRequest(`reservations/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json;charset=utf-8',
    },
    method: 'PUT',
    body: { status: 'rejected' },
  });

export const seeLoad = (token, start, end, teamId) =>
  makeRequest(
    `reservations/seeload?start_date=${start}&end_date=${end}&team_id=${teamId}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
