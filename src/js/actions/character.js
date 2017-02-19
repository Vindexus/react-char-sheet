import * as actionTypes from '../actionTypes/character'

export const updateCharacter = (character)=> {
  return {
    type: actionTypes.UPDATE_CHARACTER,
    payload: character
  }
}

export const upgradeStat = (key) => {
  return modifyStat(key, 1)
}

export const downgradeStat = (key) => {
  return modifyStat(key, -1)
}

export const modifyStat = (key, amount) => {
  return {
    type: actionTypes.MODIFY_STAT,
    payload: {
      key: key,
      amount: amount
    }
  }
}