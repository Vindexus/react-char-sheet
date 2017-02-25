import React from 'react'
import { connect } from 'react-redux'

import { fetchCharacters, addCharacter } from '../actions/character'

import CharacterSheet from './CharacterSheet'

@connect((store) => {
  return {
    characters: store.characters
  }
})

export default class CharacterSheets extends React.Component {
  componentWillMount () {
    this.props.dispatch(fetchCharacters())
  }

  addCharacter () {
    this.props.dispatch(addCharacter())
  }

  render () {
    const { characters } = this.props
    if(characters.list.loading) {
      return (<p>Loading...</p>)
    }
    const characterSheets = characters.list.map((character) => {
      return <CharacterSheet character={character} key={character.id} />
    })
    return (
      <section>
          <h1>Characters</h1>
          <p><button onClick={this.addCharacter.bind(this)}>Add Character</button></p>
          {characterSheets}
      </section>
    )
  }
}