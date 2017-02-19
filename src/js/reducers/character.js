import * as actionTypes from '../actionTypes/character'

export default function reducer (state = {}, action) {
  switch (action.type) {
    case actionTypes.MODIFY_STAT:
      let newState = {
        ...state
      }
      let stat = newState.stats[action.payload.key]
      stat += action.payload.amount
      stat = Math.min(stat, 3)
      stat = Math.max(stat, -1)
      newState.stats[action.payload.key] = stat
      return newState
      break
  }
  return state
}