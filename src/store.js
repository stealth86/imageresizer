import { createStore,applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import { syncHistoryWithStore } from 'react-router-redux';
import createHistory from "history/createBrowserHistory";
import rootReducer from './reducers';

const initialState = {}

const middleware = [thunk]

export const store = createStore(rootReducer,initialState,applyMiddleware(...middleware));

const browserHistory = createHistory();
export const history = syncHistoryWithStore(browserHistory, store);