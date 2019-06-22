import { combineReducers } from 'redux'
import { firebaseReducer } from 'react-redux-firebase'
import app from './app/reducer'
// import { metaReducer as analyticsMetaReducer } from '../analytics'

export default combineReducers({
  app,
  // analytics: analyticsMetaReducer,
  firebase: firebaseReducer
})
