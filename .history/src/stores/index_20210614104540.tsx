import { combineReducers } from 'redux'
import { AuthReducers } from './reducers/AuthReducers'
import { MasterReducers } from './reducers/MasterReducers'

export default combineReducers({
    AuthInfo: AuthReducers,
    Master: MasterReducers
})