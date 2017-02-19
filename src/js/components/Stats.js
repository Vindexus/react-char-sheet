import React from 'react'
import store from '../store'

import { upgradeStat, downgradeStat } from '../actions/character'

class Stat extends React.Component {
  render () {
    return <span>{(this.props.stat >= 0 ? '+' : '') + this.props.stat}</span>
  }
}

export default class Stats extends React.Component {
  addStat (key) {
    store.dispatch(upgradeStat(this.props.character, key))
  }

  minusStat (key) {
    store.dispatch(downgradeStat(this.props.character, key))
  }

  render () {
    const keys = Object.keys(this.props.character.stats)
    const statRows = keys.map((key) => {
      return (
        <tr key={key}>
          <td>{key}</td>
          <td><Stat stat={this.props.character.stats[key]} /></td>
          <td>
            <button type="button" onClick={() => { this.addStat(key) }}> + UPGRADE</button>
            <button type="button" onClick={() => { this.minusStat(key) }}> - DOWNGRADE</button>
          </td>
        </tr>
      )
    })
    return (
      <table>
        <tbody>
          {statRows}
        </tbody>
      </table>
    )
  }
}