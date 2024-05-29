import { createStore, applyMiddleware } from 'redux';
import reducer from './reducer';
import thunkMiddleware from 'redux-thunk'

const store = createStore(
  reducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
  applyMiddleware(thunkMiddleware),
);

export default store;
