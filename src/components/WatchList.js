import React, { useState, useEffect } from 'react';
import { View, StyleSheet, FlatList } from 'react-native';
import { connect } from 'react-redux';

import MovielistItem from './MovieListItem';
import DisplayError from './DisplayError';

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

      setMovies(movies);
    } catch (error) {
      setIsError(true);
      setMovies([]);
    }
    setIsRefreshing(false);
  };

  const navigateToMovieDetails = (MovieID) => {
    navigation.navigate("ViewMovie", { MovieID });
  };

  const amIWatched = (MovieID) => {
    if (watchedMovies.findIndex(i => i === MovieID) !== -1) {
      return true;
    }
    return false;
  };

  return (
    <View style={styles.container}>
      {
        isError ?
          (<DisplayError message='Impossible de récupérer les movies favoris' />) :
          (<FlatList
            data={movies}
            extraData={watchedMovies}
            keyExtractor={(item) => item.id?.toString()}
            renderItem={({ item }) => (
              <MovielistItem
                movieData={item}
                onClick={navigateToMovieDetails}
                isFav={amIWatched(item.id)} />
            )}
            refreshing={isRefreshing}
            onRefresh={refreshWatchList}
          />)
      }
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