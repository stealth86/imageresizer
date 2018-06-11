import { SWITCH_DOWNLOAD,SWITCH_PREVIEW,ADD_TO_IMAGE_LIST,
         UPDATE_PROGRESS, 
         RESET_IMAGE_LIST} from './types';

export const switchDownload = (checked) => (dispatch) =>{
    dispatch(
        {
            type:SWITCH_DOWNLOAD,
            payload: checked
        }
    )
}

export const switchPreview = (checked) => (dispatch) =>{
    dispatch(
        {
            type:SWITCH_PREVIEW,
            payload: checked
        }
    )
}

export const addToImageList = (imageData) =>(dispatch) =>{
    dispatch(
        {
            type:ADD_TO_IMAGE_LIST,
            payload:imageData
        }
    )
}

export const resetImageList = () =>(dispatch) =>{
    dispatch(
        {
            type:RESET_IMAGE_LIST,
            payload:null
        }
    )
}

export const updateProgress = (progress) =>(dispatch) =>{
    dispatch(
        {
            type:UPDATE_PROGRESS,
            payload:progress
        }
    )
}