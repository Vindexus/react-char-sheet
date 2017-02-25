import React from 'react'
import { connect } from 'react-redux'

import { updateCharacter } from '../actions/character'

import Stats from './Stats'

@connect()

export default class CharacterSheet extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      name: this.props.character.name
    }

    this.handleChange = this.handleChange.bind(this)
    this.onKeyPress = this.onKeyPress.bind(this)
  }

  handleChange (event) {
    this.setState({name: event.target.value})
  }

  onKeyPress (event) {
    if (event.key === 'Enter') {
      console.log('do validate');
      this.props.dispatch(updateCharacter({
        ...this.props.character,
        name: this.state.name
      }))
    }
  }

  render () {
    const { character } = this.props
    return (
      <section>
        <h1><input type="text" value={this.state.name} onChange={this.handleChange} onKeyPress={this.onKeyPress} /></h1>
        <Stats character={character} />
      </section>
    )
  }
}