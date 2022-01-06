const initialState = { watchedMoviesID: [] }

function watchedMovies(state = initialState, action) {
  let nextState
  switch (action.type) {
    case 'SAVE_MOVIE':
      nextState = {
        ...state,
        watchedMoviesID: [...state.watchedMoviesID, action.value]
      };
      return nextState || state
    case 'UNSAVE_MOVIE':
      nextState = {
        ...state,
        watchedMoviesID: state.watchedMoviesID.filter(id => id !== action.value)
      };
      return nextState || state
    default:
      return state
  };
}

export default watchedMovies;