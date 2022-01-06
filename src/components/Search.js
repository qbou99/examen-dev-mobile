import React, { useState, useEffect } from 'react';
import { View, TextInput, Button, StyleSheet, FlatList, Keyboard, Dimensions } from 'react-native';
import { connect } from 'react-redux';

import MovieListItem from './MovieListItem';
import DisplayError from './DisplayError';
import { getPopularMovies, getMoviesSearch } from '../api/TMDB';

const Search = ({ navigation }) => {

  const [movies, setMovies] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [nextPage, setNextPage] = useState(1);
  const [isMoreResults, setIsMoreResults] = useState(true);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    requestMovies([], 1, '');
  }, []); // Uniquement à l'initialisation

  const requestMovies = async (prevMovies, offset, search) => {
    setIsRefreshing(true);
    setIsError(false);

    try {
      let tmdbResult;
      if(search === '')
        tmdbResult = await getPopularMovies(offset);
      else
        tmdbResult = await getMoviesSearch(search, offset);
      setMovies([...prevMovies, ...tmdbResult.results]);
      if (tmdbResult.total_pages + 20 < tmdbResult.total_results) {
        setIsMoreResults(true);
        setNextPage(tmdbResult.page + 1);
      } else {
        setIsMoreResults(false);
      }
    } catch (error) {
      setIsError(true);
      setMovies([]);
      setIsMoreResults(true);
      setNextPage(1);
    }
    setIsRefreshing(false);
  };

  const searchMovies = () => {
    Keyboard.dismiss();
    requestMovies([], 1, searchTerm);
  };

  const dismissSearch = () => {
    setSearchTerm('');
    requestMovies([], 1, '');
  };

  const loadMoreMovies = () => {
    if (isMoreResults) {
      requestMovies(movies, nextPage, searchTerm);
    };
  };

  const navigateToMovieDetails = (movieID) => {
    navigation.navigate("ViewMovie", { movieID });
  };

  return (
    <View style={styles.container}>
      <View style={styles.searchContainer}>
        <View>
          <TextInput
            placeholder='Nom du film'
            style={styles.inputMovieName}
            value={searchTerm}
            onChangeText={(text) => setSearchTerm(text)}
            onSubmitEditing={searchMovies}
          />
          <Button
            title='X'
            onPress={dismissSearch}
          />
        </View>
        <Button
          title='Rechercher'
          onPress={searchMovies}
        />
      </View>
        <FlatList
          data={movies}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <MovieListItem
              movieData={item}
              onClick={navigateToMovieDetails} />
          )}
          onEndReached={loadMoreMovies}
          onEndReachedThreshold={0.5}
          refreshing={isRefreshing}
          onRefresh={searchMovies}
        />
    </View>
  );
};

const mapStateToProps = (state) => {
  return {
    watchedMovies: state.watchedMoviesID
  }
}

export default connect(mapStateToProps)(Search);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 12,
    marginTop: 16,
  },
  searchContainer: {
    marginBottom: 16,
  },
  inputMovieName: {
    marginBottom: 8,
  },
});