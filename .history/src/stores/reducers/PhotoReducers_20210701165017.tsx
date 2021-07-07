import { PhotoStates } from "../states/PhotoStates";

export const PhotoReducers = (state = PhotoStates, action: { type: any; payload: { mode: any; autoSubmit: any; openCamera: any; }; }) => {
    switch (action.type) {
        case 'SET_OPEN_PHOTO':
            return {
                ...state,
                mode: action.payload.mode,
                autoSubmit: action.payload.autoSubmit,
                openCamera: action.payload.openCamera
            }
        case 'SET_LIST_PHOTO':
            return {
                ...state,
                photoList: action.payload
            }
        case 'SET_LIST_SCAN':
            return {
                ...state,
                scanList: action.payload
            }
        case 'SET_CAPTURE_PHOTO':
            return {
                ...state,
                photoCapture: action.payload
            }
        case 'SET_SCAN_CODE':
            return {
                ...state,
                scanCapture: action.payload
            }
        case 'SET_PHOTO_LIST_MODE':
            return {
                ...state,
                photoListMode: action.payload
            }
        case 'SET_PHOTO_ID':
            return {
                ...state,
                photoID: action.payload
            }
        default:
            return state
    }
}