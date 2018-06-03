import { SWITCH_DOWNLOAD } from './types';

export const switchDownload = () => (dispatch,getState) =>{
    const{ControlReducer} = getState();
    dispatch(
        {
            type:SWITCH_DOWNLOAD,
            payload: !ControlReducer.download
        }
    )
}