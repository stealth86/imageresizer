import { SWITCH_DOWNLOAD,SWITCH_PREVIEW,ADD_TO_IMAGE_LIST } from './types';

export const switchDownload = () => (dispatch,getState) =>{
    const{ControlReducer} = getState();
    dispatch(
        {
            type:SWITCH_DOWNLOAD,
            payload: !ControlReducer.download
        }
    )
}

export const switchPreview = () => (dispatch,getState) =>{
    const{ControlReducer} = getState();
    dispatch(
        {
            type:SWITCH_PREVIEW,
            payload: !ControlReducer.preview
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