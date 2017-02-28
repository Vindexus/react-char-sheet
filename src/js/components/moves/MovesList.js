import React from 'react'

import * as advancedMoves from '../../data/advancedMoves'

export default class MovesList extends React.Component {
  render () {
    if(!this.props.moveKeys || this.props.moveKeys.length == 0) {
      return null
    }

    const moves = this.props.moveKeys.map((key) => {
      const move = advancedMoves[key]
      return <li key={move.key}><strong>{move.name}</strong><br />{move.description}</li>
    })

    return <ul class="moves-list">{moves}</ul>
  }
}