import { DEFAULT_HEIGHT,DEFAULT_WIDTH, DEFAULT_QUALITY} from '../Constants';
import { SET_HEIGHT,SET_WIDTH, SET_QUALITY, SWITCH_PERCENT} from '../actions/types';

const initialState={
    width:DEFAULT_WIDTH,
    height:DEFAULT_HEIGHT,
    quality:DEFAULT_QUALITY,
    usePercent:false
}

export default function (state=initialState, action) {
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
        case SET_QUALITY:
            return{
                ...state,
                quality : action.payload
            }
        case SWITCH_PERCENT:
            return{
                ...state,
                usePercent : action.payload
            }
        default:
            return {
                ...state
            }
        }
    }
