import React from 'react'
import ReactDOM from 'react-dom'


import { Provider } from "react-redux"

import CharacterSheets from './components/CharacterSheets'
import CombatStatus from './components/CombatStatus'

import store from './store'

ReactDOM.render(
<Provider store={store}>
  <div class="container">
    <CharacterSheets />
    <hr />
    <CombatStatus />
  </div>
</Provider>, document.getElementById('app'))