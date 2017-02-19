import React from 'react'
import ReactDOM from 'react-dom'


import { Provider } from "react-redux"

import CharacterSheet from './components/CharacterSheet'

import store from './store'

ReactDOM.render(
<Provider store={store}>
  <CharacterSheet />
</Provider>, document.getElementById('app'))