export default (...args) => ({ dispatch, getState }) => next => (action) => {
  if (typeof action === 'function') {
    return action(dispatch, getState);
  }
  const { promise, types, ...rest } = action;
  if (!promise) {
    return next(action);
  }
  const [REQUEST, SUCCESS, FAILURE] = types;
  next({ ...rest, type: REQUEST });
  return promise(...args)
    .then(
      value => next({ ...rest, ...value, type: SUCCESS })
    ).catch(
      error => next({ ...rest, error, type: FAILURE })
    });
};
