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
        default:
            return state
    }
}