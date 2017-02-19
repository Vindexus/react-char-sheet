import React from 'react'
import { connect } from 'react-redux'

import Stats from './Stats'

@connect((store) => {
  return {
    character: store.character
  }
})

export default class CharacterSheet extends React.Component {
  render () {
    const { character } = this.props
    return (
      <section>
        <h1>{character.name}</h1>
        <Stats character={character} />
      </section>
    )
  }
}