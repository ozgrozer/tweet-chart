import React from 'react'
import ReactDOM from 'react-dom'

import './../css/style.scss'

const App = () => {
  return (
    <div id='app'>
      <h1>Tweet Chart</h1>
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))
