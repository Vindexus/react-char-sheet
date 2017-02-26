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
    let stats = this.props.character.stats
    if(stats == undefined) {
      stats = {}
    }
    const keys = Object.keys(stats)
    const statRows = keys.map((key) => {
      return (
        <tr key={key}>
          <td>{key}</td>
          <td><Stat stat={this.props.character.stats[key]} /></td>
          <td>
            <button class="btn btn-secondary btn-sm" type="button" onClick={() => { this.addStat(key) }}> + </button>
            <button class="btn btn-secondary btn-sm" type="button" onClick={() => { this.minusStat(key) }}> - </button>
          </td>
        </tr>
      )
    })
    return (
      <table class="table table-striped table-sm">
        <tbody>
          {statRows}
        </tbody>
      </table>
    )
  }
}