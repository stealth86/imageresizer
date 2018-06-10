import { DEFAULT_HEIGHT,DEFAULT_WIDTH, DEFAULT_QUALITY} from '../Constants';
import { SET_HEIGHT,SET_WIDTH, SET_QUALITY} from '../actions/types';

const initialState={
    width:DEFAULT_WIDTH,
    height:DEFAULT_HEIGHT,
    quality:DEFAULT_QUALITY
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
        default:
            return {
                ...state
            }
        }
    }
