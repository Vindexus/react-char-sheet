import React from 'react'

import { connect } from 'react-redux'

import { updateCharacterHealth } from '../actions/character'

@connect()

export default class CharacterHP extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      currentHP: this.props.character.currentHP || 0,
      maxHP: this.props.character.maxHP || 10
    }
  }

  changeCurrent (e) {
    let hp = Math.min(e.target.value, this.state.maxHP)
    if(isNaN(hp)){
      hp = this.state.currentHP
    }
    this.setState({
      currentHP: hp
    })
  }

  changeMax (e) {
    this.setState({
      maxHP: e.target.value
    })
  }

  submitHealth (e) {
    e.preventDefault()
    this.props.dispatch(updateCharacterHealth(this.props.character, this.state.currentHP, this.state.maxHP))
  }

  render () {
    const { currentHP, maxHP } = this.state
    return (
      <section class="character-hp form-inline">
        <form onSubmit={this.submitHealth.bind(this)}>
          <label>Health: </label> 
          <input value={currentHP} class="form-control" size="1" onChange={this.changeCurrent.bind(this)} />
          /
          <input value={maxHP} class="form-control" size="1" onChange={this.changeMax.bind(this)} />
          <button class="btn btn-default ml-sm-1" type="submit">Save</button>
        </form>
      </section>
    )
  }
}