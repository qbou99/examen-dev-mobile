const API_KEY = '8e8d3f72743b301fd9b4b0ef20cd0ba5';

export async function getPopularMovies(page = 1) {
  try {
    const url = `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}&page=${page}`;
    const response = await fetch(url);
    const json = await response.json();
    return json;
  } catch (error) {
    console.log(`Error with function getPopularMovies ${error.message}`);
    throw error;
  }
};

export async function getMoviesSearch(query = '', page = 1) {
  try {
    const url = `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&page=${page}&query=${query}`;
    const response = await fetch(url);
    const json = await response.json();
    return json;
  } catch (error) {
    console.log(`Error with function getMoviesSearch ${error.message}`);
    throw error;
  }
};

export async function getMovieDetails(MovieID) {
  try {
    const url = `https://api.themoviedb.org/3/movie/${MovieID}?api_key=${API_KEY}`;
    const response = await fetch(url);
    const json = await response.json();
    return json;
  } catch (error) {
    console.log(`Error with function getMovieDetails ${error.message}`);
    throw error;
  }
};

export async function getMovieCredits(MovieID) {
  try {
    const url = `https://api.themoviedb.org/3/movie/${MovieID}/credits?api_key=${API_KEY}`;
    const response = await fetch(url);
    const json = await response.json();
    return json;
  } catch (error) {
    console.log(`Error with function getMovieCredits ${error.message}`);
    throw error;
  }
};