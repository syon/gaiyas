const initialState = { isWaiting: true, progressRate: 0 }

const waiting = (state = initialState, action) => {
  switch (action.type) {
    case 'RECEIVED_1ST':
      return Object.assign({}, state, {
        isWaiting: (action.data.count >= 200),
      })
    case 'UPD_PROGRESS':
      return Object.assign({}, state, {
        progressRate: 1 - (action.remain / action.all),
      })
    case 'GO_AHEAD':
      return Object.assign({}, state, {
        isWaiting: false,
      })
    default:
      return state
  }
}

export default waiting
