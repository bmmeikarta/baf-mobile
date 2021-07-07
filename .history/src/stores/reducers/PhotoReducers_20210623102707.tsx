import { PhotoStates } from "../states/PhotoStates";

export const PhotoReducers = (state = PhotoStates, action) => {
    switch (action.type) {
        case 'SET_OPEN_PHOTO':
            return {
                ...state,
                mode: action.payload.mode,
                openCamera: action.payload.openCamera
            }
        default: 
            return state
    }
}