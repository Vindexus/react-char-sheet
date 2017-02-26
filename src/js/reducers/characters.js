import * as actionTypes from '../actionTypes/character'

import store from '../store'

export default function reducer (state = {}, action) {
  switch (action.type) {
    case actionTypes.MODIFY_STAT_FULFILLED:
      const newState = {
        ...state
      }
      return newState
      break
    case actionTypes.FETCH_CHARACTERS_PENDING:
      return {
        ...state,
        loading: true
      }
      break
    case actionTypes.FETCH_CHARACTERS_FULFILLED:
      return {
        ...state,
        loading: false,
        list: action.payload
      }
      break
    case actionTypes.FETCH_CHARACTER_FULFILLED:
      let characters = state.list
      for(var i = 0; i < characters.length; i++) {
        if(characters[i].id == action.payload.id) {
          characters[i] = action.payload
        }
      }
      return {
        ...state,
        list: characters
      }
      break
    default:
      return state
  }
}