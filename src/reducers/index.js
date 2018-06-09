import { combineReducers} from 'redux';
import { routerReducer } from 'react-router-redux';
import ControlReducer from './ControlReducer';
import SettingReducer from './SettingReducer';

export default combineReducers({
    ControlReducer,
    SettingReducer,
    routing : routerReducer
});