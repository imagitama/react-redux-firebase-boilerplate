import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { ConnectedRouter } from 'connected-react-router'
import firebase from 'firebase/app'
import ReactReduxFirebaseProvider from 'react-redux-firebase/lib/ReactReduxFirebaseProvider'
import store, { history } from './store'
import App from './app'

const target = document.querySelector('#root')

const rrfProps = {
  firebase,
  config: {
    userProfile: 'users'
  },
  dispatch: store.dispatch
}

render(
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <ReactReduxFirebaseProvider {...rrfProps}>
        <App />
      </ReactReduxFirebaseProvider>
    </ConnectedRouter>
  </Provider>,
  target
)
