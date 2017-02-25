import '../actionTypes/character'
import axios from 'axios'

export const updateCharacter = (character)=> {
  return {
    type: UPDATE_CHARACTER,
    payload: character
  }
}

export const upgradeStat = (character, key) => {
  return modifyStat(character, key, 1)
}

export const downgradeStat = (character, key) => {
  return modifyStat(character, key, -1)
}

export const fetchCharacter = () => {
  return (dispatch) => {
    dispatch({
      type: 'FETCH_CHARACTER_PENDING'
    })

    axios.get("http://rest.learncode.academy/api/vindexus/characters/58a93858c0be46010096439b")
        .then((resp) => {
            dispatch({
              type: 'FETCH_CHARACTER_FULFILLED',
              payload: resp.data
            })
        })
        .catch((err) => {
          dispatch({
            type: 'FETCH_CHARACTER_REJECTED',
            payload: err
          })
        })
  }
}

export const modifyStat = (character, key, amount) => {
  return (dispatch) => {
    dispatch({
      type: 'MODIFY_STAT_PENDING'
    })

    let stat = character.stats[key]
    stat += amount
    stat = Math.min(stat, 3)
    stat = Math.max(stat, -1)
    character.stats[key] = stat

    axios.put('http://rest.learncode.academy/api/vindexus/characters/58a93858c0be46010096439b', character)
        .then((resp) => {
          dispatch({
            type: 'MODIFY_STAT_FULFILLED',
            payload: resp
          })
          dispatch(fetchCharacter())
        })
        .catch((err) => {
          dispatch({
            type: 'MODIFY_STAT_REJECTED',
            payload: err
          })
        })
  }
}