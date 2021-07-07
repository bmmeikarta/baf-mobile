import { createStore } from 'redux'
import { persistStore, persistReducer, createTransform  } from 'redux-persist'
import storage from 'redux-persist/lib/storage' // defaults to localStorage for web
import JSOG from 'jsog'
import rootReducer from '../stores'
import AsyncStorage from '@react-native-async-storage/async-storage';

export const JSOGTransform = createTransform(
  (inboundState, key) => JSOG.encode(inboundState),
  (outboundState, key) => JSOG.decode(outboundState),
)

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  // transforms: [JSOGTransform]
}

const persistedReducer = persistReducer(persistConfig, rootReducer)

export const store = createStore(persistedReducer)
export const persistor = persistStore(store)