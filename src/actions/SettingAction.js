import { SET_HEIGHT,SET_WIDTH,SET_QUALITY, SET_PERCENT, SWITCH_PERCENT} from './types';

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

export const setQuality = (quality)=>(dispatch)=>{
    dispatch({
        type:SET_QUALITY,
        payload:quality
    })
}

export const setPercent = (percent)=>(dispatch)=>{
    dispatch({
        type:SET_PERCENT,
        payload:percent
    })
}

export const switchPercent = (checked)=>(dispatch)=>{
    dispatch({
        type:SWITCH_PERCENT,
        payload:checked
    })
}


