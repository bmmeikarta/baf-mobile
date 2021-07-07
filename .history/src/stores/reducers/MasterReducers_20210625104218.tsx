import { MasterStates } from '../states/MasterStates'

export const MasterReducers = (state = MasterStates, action: { type: any; payload: { id_user: any; full_name: any; email: any; token: any; roles: { detail: any }; expires_at: any } }) => {
    switch (action.type) {
        case 'SET_MKRT_UNIT':
            return {
                ...state,
                mkrt_unit: action.payload
            }
        case 'SET_NOW_SCHEDULE':
            return {
                ...state,
                schedule_now: action.payload
            }
        case 'SET_CHOOSED_FLOOR':
            return {
                ...state,
                choosedFloor: action.payload
            }
        case 'SET_CHOOSED_ZONE':
            return {
                ...state,
                choosedZone: action.payload
            }
        case 'SET_SCAN_ZONE':
            return {
                ...state,
                scannedZone: action.payload
            }
        case 'SET_CATEGORY_LIST':
            return {
                ...state,
                categoryList: action.payload
            }
        case 'SET_INSERT_HISTORY':
            return {
                ...state,
                historyStore: action.payload
            }
        case 'SET_PHOTO_CAPTURE':
            return {
                ...state,
                photoCapture: action.payload
            }
        case 'SET_PHOTO_GROUP_MODAL':
            return {
                ...state,
                photoGroupModal: action.payload
            }
        case 'SET_SELECTED_CAT_ID':
            return {
                ...state,
                bafChooser: action.payload
            }
        default:
            return state
    }
}