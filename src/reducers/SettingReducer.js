import { DEFAULT_HEIGHT,DEFAULT_WIDTH, DEFAULT_QUALITY, DEFAULT_PERCENT, FORMAT_JPG} from '../Constants';
import { SET_HEIGHT,SET_WIDTH, SET_QUALITY, SWITCH_PERCENT, SET_PERCENT, SET_FROM_FORMAT, SET_TO_FORMAT} from '../actions/types';

const initialState={
    width:DEFAULT_WIDTH,
    height:DEFAULT_HEIGHT,
    quality:DEFAULT_QUALITY,
    percent:DEFAULT_PERCENT,
    fromFormat:FORMAT_JPG,
    toFormat:FORMAT_JPG,
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
        case SET_PERCENT:
            return{
                ...state,
                percent : action.payload
            }
        case SET_FROM_FORMAT:
            return{
                ...state,
                fromFormat : action.payload
            }
        case SET_TO_FORMAT:
            return{
                ...state,
                toFormat : action.payload
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
