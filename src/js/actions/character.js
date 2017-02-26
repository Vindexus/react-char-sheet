import * as actionTypes from '../actionTypes/character'
import axios from 'axios'

const charactersUrl = 'http://rest.learncode.academy/api/vindexus3/characters/'

export const updateCharacter = (character)=> {
  return (dispatch => {
    dispatch({
      type: actionTypes.UPDATE_CHARACTER_PENDING
    })
    axios.put(charactersUrl + character.id, character)
      .then((resp) => {
        dispatch({
          type: actionTypes.UPDATE_CHARACTER_FULFILLED,
          payload: resp.data
        })
        dispatch(fetchCharacters())
      })
      .catch((err) => {
        dispatch({
          type: actionTypes.UPDATE_CHARACTER_REJECTED,
          payload: err
        })
      })
  })
}

export const deleteCharacter = (id)=> {
  return (dispatch => {
    dispatch({
      type: actionTypes.DELETE_CHARACTER_PENDING
    })
    axios.delete(charactersUrl + id)
      .then((resp) => {
        dispatch({
          type: actionTypes.DELETE_CHARACTER_FULFILLED,
          payload: resp.data
        })
        dispatch(fetchCharacters())
      })
      .catch((err) => {
        dispatch({
          type: actionTypes.DELETE_CHARACTER_REJECTED,
          payload: err
        })
      })
  })
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
      type: actionTypes.FETCH_CHARACTER_PENDING
    })

    axios.get(charactersUrl + id)
        .then((resp) => {
            dispatch({
              type: actionTypes.FETCH_CHARACTER_FULFILLED,
              payload: resp.data
            })
        })
        .catch((err) => {
          dispatch({
            type: actionTypes.FETCH_CHARACTER_REJECTED,
            payload: err
          })
        })
  }
}

export const fetchCharacters = (id) => {
  return (dispatch) => {
    dispatch({
      type: actionTypes.FETCH_CHARACTERS_PENDING
    })

    axios.get(charactersUrl)
        .then((resp) => {
            dispatch({
              type: actionTypes.FETCH_CHARACTERS_FULFILLED,
              payload: resp.data
            })
        })
        .catch((err) => {
          dispatch({
            type: actionTypes.FETCH_CHARACTERS_REJECTED,
            payload: err
          })
        })
  }
}

export const addCharacter = () => {
  return (dispatch => {
    const defaultCharacter = {
      name: 'Vindexus ' + new Date().getTime().toString().substr(-3),
      stats: {
        strength: 0,
        wits: 0,
        aim: 0,
        speed: 0
      },
      moves: [],
      currentHP: 10,
      maxHP: 10
    }
    dispatch({
      type: actionTypes.ADD_CHARACTER_PENDING
    })
    axios.post(charactersUrl, defaultCharacter)
      .then((resp) => {
        dispatch({
          type: actionTypes.ADD_CHARACTER_FULFILLED,
          payload: resp.data
        })
        dispatch(fetchCharacters())
      })
      .catch((err) => {
        dispatch({
          type: actionTypes.ADD_CHARACTER_REJECTED,
          payload: err
        })
      })
  })
}

export const modifyStat = (character, key, amount) => {
  return (dispatch) => {
    dispatch({
      type: actionTypes.MODIFY_STAT_PENDING
    })

    let stat = character.stats[key]
    stat += amount
    stat = Math.min(stat, 3)
    stat = Math.max(stat, -1)
    character.stats[key] = stat

    axios.put(charactersUrl + character.id, character)
      .then((resp) => {
        dispatch({
          type: actionTypes.MODIFY_STAT_FULFILLED,
          payload: resp.data
        })
        dispatch(fetchCharacter(character.id))
      })
      .catch((err) => {
        dispatch({
          type: actionTypes.MODIFY_STAT_REJECTED,
          payload: err
        })
      })
  }
}


export const characterAddMove = (character, newMoveKey) => {
  character.moves = character.moves || []

  if(character.moves.indexOf(newMoveKey) >= 0) {
    return {
      type: 'CHARACTER_ADD_MOVE_REJECTED',
      payload: {
        character: character,
        error: 'You already have that move'
      }
    }
  }

  character.moves.push(newMoveKey)
  return updateCharacter(character)
}