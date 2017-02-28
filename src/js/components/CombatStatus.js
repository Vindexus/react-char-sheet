import React, { Component, Proptypes } from 'react'
import { connect } from 'react-redux'

import { firebaseConnect, isLoaded, isEmpty, dataToJS } from 'react-redux-firebase'

console.log(typeof firebaseConnect)
console.log('dataToJS', typeof dataToJS)

@firebaseConnect([
  '/combat-status'
])

@connect(
  ({firebase}) => ({
    status: dataToJS(firebase, '/combat-status')
  })
)

export default class CombatStatus extends Component {
  render () {
    const { firebase, status } = this.props
    console.log('status', status)
    console.log('this.props', this.props)

    const styleObj = {
      color: 'red'
    }

    if(!isLoaded) {
      return <div style={styleObj}>LOADING</div>
    }

    if(status == true) {
      return <h1>In Combat</h1>
    }
    else {
      return <p>not in combat</p>
    }
  }
}