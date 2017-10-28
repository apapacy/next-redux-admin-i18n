import { createStore, applyMiddleware } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import thunkMiddleware from 'redux-thunk'
import logger from 'redux-logger'
import axios from 'axios'
import {
    persist,
    deserialize
} from './persist';
import promisedMiddleware from './promisedMiddleware'
const promised = promisedMiddleware(axios)
console.log(promised)

const exampleInitialState = {
  lastUpdate: 0,
  light: false,
  count: 0
}

export const actionTypes = {
  ADD: 'ADD',
  TICK: 'TICK'
}

// REDUCERS
export const reducer = (state = exampleInitialState, action) => {
  switch (action.type) {
    case actionTypes.TICK:
      return Object.assign({}, state, { lastUpdate: action.ts, light: !!action.light })
    case actionTypes.ADD:
      return Object.assign({}, state, {
        count: state.count + 1
      })
    case 'START':
      console.log('start', action.type)
      return state
    case 'SUCCESS':
      console.log('success', action.data.data)
      console.log('success', typeof action.data.data)
      return {...state, ...action.data.data, ...action.options}
    case 'FAILURE':
      console.log('start', action.error)
      return Object.assign({}, state, {error: true} )
    default: return state
  }
}


export function getTime(options){
    return {
      promised: () => axios.get('http://time.jsontest.com/'),
      types: ['START', 'SUCCESS', 'FAILURE'],
      options
    };
}
// ACTIONS
export const serverRenderClock = (isServer) => dispatch => {
  return dispatch({ type: actionTypes.TICK, light: !isServer, ts: Date.now() })
}

export const startClock = () => dispatch => {
  return setInterval(() => dispatch({ type: actionTypes.TICK, light: true, ts: Date.now() }), 800)
}

export const addCount = () => dispatch => {
  return dispatch({ type: actionTypes.ADD })
}

export const initStore = (initialState = exampleInitialState) => {
  // const state = deserialize();
  const store = createStore(reducer, {...initialState},
    composeWithDevTools(applyMiddleware(thunkMiddleware, logger, promised)))
  store.dispatchAsync = function(action) {
    this.dispatch(action)
    return action.promise
  }
  return store
}
