import React from 'react'
import ReactDOM from 'react-dom'


import { Provider } from "react-redux"

import CharacterSheets from './components/CharacterSheets'

import store from './store'

ReactDOM.render(
<Provider store={store}>
  <CharacterSheets />
</Provider>, document.getElementById('app'))