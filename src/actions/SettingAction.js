import { SET_HEIGHT,SET_WIDTH} from './types';

export const setWidth = (width)=>(dispatch)=>{
    dispatch({
        type:SET_WIDTH,
        payload:width
    })
}

export const setHeight = (height)=>(dispatch)=>{
    dispatch({
        type:SET_HEIGHT,
        payload:height
    })
}