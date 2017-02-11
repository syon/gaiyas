const initialState = 'New'

const tab = (state = initialState, action) => {
  switch (action.type) {
    case 'TAB_RANKING':
      return 'Ranking'
    case 'TAB_NEW':
      return 'New'
    default:
      return state
  }
}

export default tab
