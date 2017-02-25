import reducer from './reducers'
import { applyMiddleware, createStore } from "redux"
import logger from "redux-logger"

import thunk from "redux-thunk"
import promise from "redux-promise-middleware"

const initState = {
  characters: {
    list: [],
    loading: false,
    error: null
  }
}
const middleware = applyMiddleware(promise(), thunk, logger())
const store = createStore(reducer, initState, middleware)

export default store
