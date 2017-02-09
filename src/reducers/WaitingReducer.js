const initialState = true

const waiting = (state = initialState, action) => {
  switch (action.type) {
  case 'RECEIVED_1ST':
    return (action.data.count >= 200)
  case 'GO_AHEAD':
    return false
  default:
    return state
  }
}

export default waiting
