import { SWITCH_DOWNLOAD,SWITCH_PREVIEW, ADD_TO_IMAGE_LIST } from '../actions/types';

const initialState={
    download:false,
    preview:false,
    imageList:[]
}

export default function (state=initialState, action) {
    switch (action.type) {
        case SWITCH_DOWNLOAD:
            return{
                ...state,
                download : action.payload
            }
        case SWITCH_PREVIEW:
            return{
                ...state,
                preview : action.payload
            }
        case ADD_TO_IMAGE_LIST:
            return{
                ...state,
                imageList : [
                    ...state.imageList,
                    action.payload
                ]
            }
        default:
            return {
                ...state
            }
        }
    }