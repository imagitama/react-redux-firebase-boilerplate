import { DO_SOMETHING } from './actions'

const initialState = {
  didDoSomething: false
}

export default (state = initialState, action) => {
  switch (action.type) {
    case DO_SOMETHING:
      return {
        ...state,
        didDoSomething: true
      }

    default:
      return state
  }
}
