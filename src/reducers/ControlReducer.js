import { SWITCH_DOWNLOAD } from '../actions/types';

export default function (state={download:false}, action) {
    switch (action.type) {
        case SWITCH_DOWNLOAD:
            return{
                ...state,
                download : action.payload
            }
            default:
            return {
                ...state
            }
        }
    }