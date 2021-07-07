import { PhotoStates } from "../states/PhotoStates";

export const PhotoReducers = (state = PhotoStates, action) => {
    switch (action.type) {
        case 'SET_OPEN_PHOTO':
            return {
                ...state,
                mode: action.payload.mode,
                openCamera: action.payload.openCamera
            }
        case 'SET_LIST_PHOTO':
            return {
                ...state,
                photoList: action.payload
            }
        case 'SET_CAPTURE_PHOTO':
            return {
                ...state,
                photoCapture: action.payload
            }
        default: 
            return state
    }
}