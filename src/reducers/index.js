import { combineReducers} from 'redux';
import { routerReducer } from 'react-router-redux';
import ControlReducer from './ControlReducer';

export default combineReducers({
    ControlReducer,
    routing : routerReducer
});