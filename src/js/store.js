import reducer from './reducers'
import { applyMiddleware, createStore } from "redux"
import logger from "redux-logger"

const initState = {
  character: {
    name: 'Vindexus',
    stats: {
      strength: 1,
      speed: 1,
      wits: -1,
      aim: 1
    },
    items: []
  }
}

const middleware = applyMiddleware(logger())

const store = createStore(reducer, initState, middleware)

export default store
