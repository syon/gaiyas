const initialState = {
  hatena: {
    bookmarks: [],
    count: '',
  },
  ranking: [],
  bucome: [],
}

const hatebu = (state = initialState, action) => {
  switch (action.type) {
    case 'RECEIVED_NONE':
      return state
    case 'RECEIVED_1ST':
      return Object.assign({}, state, {
        hatena: action.data,
      })
    case 'MAKE_RANKING':
      return Object.assign({}, state, {
        ranking: action.ranking,
        bucome: action.bucome,
      })
    default:
      return state
  }
}

export default hatebu
