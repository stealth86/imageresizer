import { SET_HEIGHT,SET_WIDTH} from '../actions/types';

export default function (state={width:32,height:32}, action) {
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
