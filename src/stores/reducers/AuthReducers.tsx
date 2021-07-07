import { AuthStates } from '../states/AuthStates'

export const AuthReducers = (state = AuthStates, action: { type: any; payload: { id_user: any; full_name: any; email: any; token: any; roles: { detail: any }; expires_at: any } }) => {
    switch (action.type) {
        case 'SET_LOGIN_STATE':
            return {
                ...state,
                username: action.payload.id_user,
                first_name: action.payload.full_name,
                email: action.payload.email,
                menuDetail: action.payload.roles,
                isLoggedIn: true
            }
        case 'SET_CHOOSED_MENU':
            return {
                ...state,
                menuMasterChoosed: action.payload
            }
        case 'SET_PARSED_MENU':
            return {
                ...state,
                parsedMenu: action.payload
            }
        case 'SET_CHOOSED_BOTTOM_TAB':
            return {
                ...state,
                choosedBottomTab: action.payload
            }
        case 'LOGOUT':
            return {
                AuthStates
            }
        default:
            return state
    }
}