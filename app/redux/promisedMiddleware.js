export default (...args) => ({ dispatch, getState }) => (next) => (action) => {
  const { promise, types, ...rest } = action;
  if (!promise) {
    return next(action);
  }
  const [REQUEST, SUCCESS, FAILURE] = types;
  next({ ...rest, type: REQUEST });
  return promise
    .then(
      data => next({ ...rest, data, type: SUCCESS })
    ).catch(
      error => next({ ...rest, error, type: FAILURE })
    );
};

/**
function createThunkMiddleware(extraArgument) {
  return ({ dispatch, getState }) => next => action => {
    if (typeof action === 'function') {
      return action(dispatch, getState, extraArgument);
    }

    return next(action);
  };
}

const thunk = createThunkMiddleware();
thunk.withExtraArgument = createThunkMiddleware;

export default thunk;
*/