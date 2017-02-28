import { applyMiddleware, createStore, combineReducers, compose } from "redux"
import logger from "redux-logger"
import thunk from "redux-thunk"
import promise from "redux-promise-middleware"
import { reactReduxFirebase, firebaseStateReducer } from 'react-redux-firebase'

import charactersReducer from './reducers/characters'

const rootReducer = combineReducers({
  firebase: firebaseStateReducer,
  characters: charactersReducer
})

const firebaseConfig = {
  apiKey: "AIzaSyDtNM9xATwZgzAOh6Awbdt42VxW6UG6zrs",
  authDomain: "react-char-sheet.firebaseapp.com",
  databaseURL: "https://react-char-sheet.firebaseio.com",
  storageBucket: "react-char-sheet.appspot.com",
  messagingSenderId: "429714132452"
}

const initState = {
  characters: {
    list: [],
    loading: false,
    error: null
  }
}

const createStoreWithFirebase = compose(reactReduxFirebase(firebaseConfig, { userProfile: 'users'}))(createStore)

const middleware = applyMiddleware(promise(), thunk, logger())

const store = createStoreWithFirebase(rootReducer, initState, middleware)

export default store
