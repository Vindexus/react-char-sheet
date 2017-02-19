export default function reducer (state = {}, action) {
  switch (action.type) {
    case 'UPGRADE_STAT':
      let newState = {
        ...state
      }
      newState.stats[action.payload] += 1
      return newState
      break
  }
  return state
}