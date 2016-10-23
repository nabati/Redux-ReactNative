import { combineReducers } from 'redux'

const result = (state = 'Choose wisely', action) => {
  switch (action.type) {
    case 'CHOOSE_PILL':
      if (action.pill === 'red') {
        return 'Welcome to the real world'
      } else {
        return 'Stay in the Matrix'
      }
    default:
      return state
  }
}

const reducer = combineReducers({ result })

export default reducer

