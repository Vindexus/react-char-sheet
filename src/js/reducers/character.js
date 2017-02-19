import * as actionTypes from '../actionTypes/character'

import store from '../store'

export default function reducer (state = {}, action) {
  switch (action.type) {
    case 'MODIFY_STAT_FULFILLED':
      const newState = {
        ...state
      }
      return newState
      break
    case 'FETCH_CHARACTER_FULFILLED':
      return action.payload
  }
  return state
}