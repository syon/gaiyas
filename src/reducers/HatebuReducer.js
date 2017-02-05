const initialState = {
  hatena: {
    bookmarks: [],
    ranking: [],
    count: ''
  },
  bucome: []
}

const hatebu = (state = initialState, action) => {
  console.log("HatebuReducer is called.", state, action)
  switch (action.type) {
  case 'RECEIVE_POSTS':
    return Object.assign({}, state, {
      hatena: action.data
    })
  default:
    return state
  }
}

export default hatebu
