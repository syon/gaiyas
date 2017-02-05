const initialState = 'New'

const tab = (state = initialState, action) => {
  switch (action.type) {
  case 'Ranking':
    return 'Ranking'
  case 'New':
    return 'New'
  default:
    return state
  }
}

export default tab
