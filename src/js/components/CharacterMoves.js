import React from 'react'
import { connect } from 'react-redux'

import * as advancedMoves from '../data/advancedMoves'

import AdvancedMovesDropdown from './moves/AdvancedMovesDropdown'
import MovesList from './moves/MovesList'

import { characterAddMove } from '../actions/character'

@connect()

export default class CharacterMoves extends React.Component {
  constructor () {
    super()
    this.state = {
      selectedMove: 'sniper'
    }
  }

  dropdownChange (e) {
    this.setState({
      selectedMove: e.target.value
    })
  }

  addMove (e) {
    console.log('e', e)
    e.preventDefault()
    this.props.dispatch(characterAddMove(this.props.character, this.state.selectedMove))
  }

  render () {
    const selectedMove = this.state.selectedMove
    const { character } = this.props
    return (
      <section class="character-moves-container">
        <form onSubmit={this.addMove.bind(this)} class="form-inline">
          <AdvancedMovesDropdown selectedMove={selectedMove} onChange={this.dropdownChange.bind(this)} />
          <button type="submit" class="btn btn-default">Add Move</button>
        </form>
        <MovesList moveKeys={character.moves} />
      </section>
    )
  }
}