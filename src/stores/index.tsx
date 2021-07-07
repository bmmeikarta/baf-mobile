import { combineReducers } from 'redux'
import { AuthReducers } from './reducers/AuthReducers'
import { MasterReducers } from './reducers/MasterReducers'
import { PhotoReducers } from './reducers/PhotoReducers'

export default combineReducers({
    AuthInfo: AuthReducers,
    Master: MasterReducers,
    Photo: PhotoReducers
})