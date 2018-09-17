import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './containers/App'
import { Provider } from 'react-redux'
import { applyMiddleware, createStore } from 'redux'
import thunk from 'redux-thunk'
import reducers from './redux/reducers'
import registerServiceWorker from './registerServiceWorker'

const store = createStore(reducers, applyMiddleware(thunk))

console.log(store.getState())

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
)

registerServiceWorker()
