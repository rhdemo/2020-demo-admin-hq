export const GET_STATUS = 'App.GET_STATUS';
export const getStatus = () => ({
  type: GET_STATUS
});

export const GET_STATUS_PENDING = 'App.GET_STATUS_PENDING';
export const getStatusPending = () => ({
  type: GET_STATUS_PENDING
});


export const GET_STATUS_FULFILLED = 'App.GET_STATUS_FULFILLED';
export const getStatusFulfilled = (response) => ({
  type: GET_STATUS_FULFILLED,
  payload: {
    response
  }
});

export const GET_STATUS_REJECTED = 'App.GET_STATUS_REJECTED';
export const getStatusRejected = (error) => ({
  type: GET_STATUS_REJECTED,
  payload: {
    error
  }
});
