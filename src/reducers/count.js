import { INCREMENT } from '../actions'

const initialState = { value: 3 }

export default (state = initialState, action) => {
  switch (action.type) {
    case INCREMENT:
      return { value: state.value + action.addValue }
    default:
      return state
  }
}
