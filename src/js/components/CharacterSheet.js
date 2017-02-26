import React from 'react'
import { connect } from 'react-redux'

import { updateCharacter, deleteCharacter } from '../actions/character'

import Stats from './Stats'

import CharacterMoves from './CharacterMoves'
import CharacterHP from './CharacterHP'

@connect()

export default class CharacterSheet extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      name: this.props.character.name
    }

    this.handleChange = this.handleChange.bind(this)
    this.onKeyPress = this.onKeyPress.bind(this)
    this.deleteCharacter = this.deleteCharacter.bind(this)
  }

  handleChange (event) {
    this.setState({name: event.target.value})
  }

  onKeyPress (event) {
    if (event.key === 'Enter') {
      this.props.dispatch(updateCharacter({
        ...this.props.character,
        name: this.state.name
      }))
    }
  }

  deleteCharacter (event) {
    if(!confirm("Delete?")) {
      return false
    }

    this.props.dispatch(deleteCharacter(this.props.character.id))
  }

  render () {
    const { character } = this.props
    return (
      <section class="container">
        <div class="card">
          <div class="card-header form-inline">
            <input type="text" class="form-control" value={this.state.name} onChange={this.handleChange} onKeyPress={this.onKeyPress} />
            <button class="pull-right btn btn-danger" type="" onClick={this.deleteCharacter}>X</button>
          </div>
          <div class="card-block">
            <div class="row">
              <div class="col-4">
                <div class="card">
                  <div class="card-header">Stats</div>
                  <Stats character={character} />
                  <div class="card-block">
                    <CharacterHP character={character} />
                  </div>
                </div>
              </div>
              <div class="col-8">
                <div class="card">
                  <div class="card-header">Advanced Moves</div>
                  <div class="card-block">
                    <CharacterMoves character={character} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    )
  }
}