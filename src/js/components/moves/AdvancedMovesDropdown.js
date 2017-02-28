import React from 'react'

import { list } from '../../data/advancedMoves'

export default class AdvancedMovesDropdown extends React.Component {
  render () {
    const selectedMove = this.props.selectedMove
    console.log('selectedMove', selectedMove)
    const options = list.map((move) => {
      return <option value={move.key} key={move.key}>{move.name}</option>
    })
    return <select value={selectedMove} onChange={this.props.onChange} class="form-control">{options}</select>
  }
}