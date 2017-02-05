const initialState = {
  hatena: {
    bookmarks: [],
    count: ''
  },
  ranking: [],
  bucome: []
}

const hatebu = (state = initialState, action) => {
  console.log("HatebuReducer is called.", state, action)
  switch (action.type) {
  case 'RECEIVE_POSTS':
    return Object.assign({}, state, {
      hatena: action.data
    })
  case 'MAKE_RANKING':
    return Object.assign({}, state, {
      ranking: action.data.bookmarks
    })
  default:
    return state
  }
}

export default hatebu
