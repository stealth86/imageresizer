import { DEFAULT_HEIGHT,DEFAULT_WIDTH} from '../Constants';
import { SET_HEIGHT,SET_WIDTH} from '../actions/types';

export default function (state={width:DEFAULT_WIDTH,height:DEFAULT_HEIGHT}, action) {
    switch (action.type) {
        case SET_HEIGHT:
            return{
                ...state,
                height : action.payload
            }
        case SET_WIDTH:
            return{
                ...state,
                width : action.payload
            }
        default:
            return {
                ...state
            }
        }
    }
