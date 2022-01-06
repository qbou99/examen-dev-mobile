import React, { useState, useEffect } from 'react';
import { View, StyleSheet, FlatList } from 'react-native';
import { connect } from 'react-redux';

import MovielistItem from './MovieListItem';
import DisplayError from './DisplayError';

import { getMovieDetails } from '../api/TMDB';

const WatchList = ({ navigation, watchedMovies }) => {

  const [movies, setMovies] = useState([]);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    refreshWatchList();
  }, [watchedMovies]); // A chaque fois que les movies favoris changent

  const refreshWatchList = async () => {
    setIsRefreshing(true);
    setIsError(false);
    let movies = [];
    try {
      for (const id of watchedMovies) {
        const tmdbResult = await getMovieDetails(id)
        movies.push(tmdbResult);
      };
      setMovies(movies);
    } catch (error) {
      setIsError(true);
      setMovies([]);
    }
    setIsRefreshing(false);
  };

  const navigateToMovieDetails = (movieID) => {
    navigation.navigate("ViewMovie", { movieID });
  };

  return (
    <View style={styles.container}>
        <FlatList
            data={movies}
            keyExtractor={(item) => item.id?.toString()}
            renderItem={({ item }) => (
              <MovielistItem
                movieData={item}
                onClick={navigateToMovieDetails} />
            )}
            refreshing={isRefreshing}
            onRefresh={refreshWatchList}
          />
    </View>
  );
};

const mapStateToProps = (state) => {
  return {
    watchedMovies: state.watchedMoviesID
  }
}

export default connect(mapStateToProps)(WatchList);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 12,
    marginTop: 16,
  },
});