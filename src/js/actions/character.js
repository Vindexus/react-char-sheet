import * as actionTypes from '../actionTypes/character'
import axios from 'axios'

export const updateCharacter = (character)=> {
  return {
    type: actionTypes.UPDATE_CHARACTER,
    payload: character
  }
}

export const upgradeStat = (character, key) => {
  return modifyStat(character, key, 1)
}

export const downgradeStat = (character, key) => {
  return modifyStat(character, key, -1)
}

export const fetchCharacter = (id) => {
  return (dispatch) => {
    dispatch({
      type: 'FETCH_CHARACTER_PENDING'
    })

    axios.get("http://rest.learncode.academy/api/vindexus/characters/" + id)
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

export const fetchCharacters = (id) => {
  return (dispatch) => {
    dispatch({
      type: 'FETCH_CHARACTERS_PENDING'
    })

    axios.get("http://rest.learncode.academy/api/vindexus/characters")
        .then((resp) => {
            dispatch({
              type: 'FETCH_CHARACTERS_FULFILLED',
              payload: resp.data
            })
        })
        .catch((err) => {
          dispatch({
            type: 'FETCH_CHARACTERS_REJECTED',
            payload: err
          })
        })
  }
}

export const addCharacter = () => {
  return (dispatch => {
    const defaultCharacter = {
      name: 'Vindexus ' + new Date().getTime().toString().substr(-1, 3),
      stats: {
        strength: 0,
        wits: 0,
        aim: 0,
        speed: 0
      }
    }
    dispatch({
      type: 'ADD_CHARACTER_PENDING'
    })
    axios.post('http://rest.learncode.academy/api/vindexus/characters', defaultCharacter)
      .then((resp) => {
        dispatch({
          type: 'ADD_CHARACTER_FULFILLED',
          payload: resp.data
        })
        dispatch(fetchCharacters())
      })
      .catch((err) => {
        dispatch({
          type: 'ADD_CHARACTER_REJECTED',
          payload: err
        })
      })
  })
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

    axios.put('http://rest.learncode.academy/api/vindexus/characters/' + character.id, character)
        .then((resp) => {
          dispatch({
            type: 'MODIFY_STAT_FULFILLED',
            payload: resp.data
          })
          dispatch(fetchCharacter(character.id))
        })
        .catch((err) => {
          dispatch({
            type: 'MODIFY_STAT_REJECTED',
            payload: err
          })
        })
  }
}