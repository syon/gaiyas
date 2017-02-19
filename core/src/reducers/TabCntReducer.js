const initialState = {
  tabN: 0,
  tabA: 0,
}

const tab = (state = initialState, action) => {
  switch (action.type) {
    case 'RECEIVED_1ST': {
      const cntA = action.data.bookmarks.length
      const cntN = action.data.bookmarks.filter((b) => {
        return b.comment !== ''
      }).length
      return Object.assign({}, state, {
        tabN: cntN,
        tabA: cntA,
      })
    }
    case 'TABCNT_RANKING':
      return Object.assign({}, state, {
        tabR: action.count,
      })
    case 'TABCNT_NEW':
      return Object.assign({}, state, {
        tabN: action.count,
      })
    case 'TABCNT_ALL':
      return Object.assign({}, state, {
        tabA: action.count,
      })
    default:
      return state
  }
}

export default tab
