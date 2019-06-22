import GoogleTagManager from '@redux-beacon/google-tag-manager'
import { createMetaReducer, createMiddleware } from 'redux-beacon'

const options = {
  dataLayerName: 'my-data-layer'
}

const performNavigationEvent = (action, prevState, nextState) => {
  return {
    event: 'navigate',
    pageUrl: action.payload.pageUrl
  }
}

const eventsMap = {
  PERFORM_NAVIGATION: performNavigationEvent
}

const gtm = GoogleTagManager(options)

const middleware = createMiddleware(eventsMap, gtm)
const metaReducer = createMetaReducer(eventsMap, gtm)

export { middleware, metaReducer }
