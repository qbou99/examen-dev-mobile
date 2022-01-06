import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Text, ActivityIndicator, ScrollView, Image, Button } from 'react-native';
import { connect } from 'react-redux';
import Toast from 'react-native-root-toast';
import { getMovieDetails, getMovieCredits } from '../api/TMDB';

import DisplayError from './DisplayError';

const Movie = ({ route, watchedMovies, dispatch }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [movie, setMovie] = useState(null);
  const [credits, setCredits] = useState(null);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    requestMovie();
  }, []); // Uniquement à l'initialisation

  // Pourrait être directement déclarée dans useEffect
  const requestMovie = async () => {
    try {
      const tmdbResult = await getMovieDetails(route.params.movieID);
      const castResult = await getMovieCredits(route.params.movieID);
      setMovie(tmdbResult);
      setCredits(castResult.cast);
      setIsLoading(false);
    } catch (error) {
      setIsError(true);
    }
  }

  // On pourrait définir les actions dans un fichier à part
  const saveMovie = async () => {
    const action = { type: 'SAVE_MOVIE', value: route.params.MovieID };
    dispatch(action);
    let toast = Toast.show('Movie ajouté aux favoris', {
      duration: Toast.durations.LONG,
    });
  }

  const unsaveMovie = async () => {
    const action = { type: 'UNSAVE_MOVIE', value: route.params.MovieID };
    dispatch(action);
    let toast = Toast.show('Movie retiré des favoris', {
      duration: Toast.durations.LONG,
    });
  }

  const displayMovieImage = () => {
    /*if (Movie.featured_image) {
      return (
        <Image style={styles.MovieImage}
          source={{ uri: Movie.featured_image }} />
      );
    };*/
    return (
      <View style={styles.containerNoMovieImage}>
      </View>
    );
  };

  const displaySaveMovie = () => {
    if (watchedMovies.findIndex(i => i === route.params.MovieID) !== -1) {
      // Le Movie est sauvegardé
      return (
        <Button
          title='Watched'
          onPress={unsaveMovie}
        />
      );
    }
    // Le Movie n'est pas sauvegardé
    return (
      <Button
        title='Watch'
        onPress={saveMovie}
      />
    );
  }

  return (
    <View style={styles.container}>
        {(isLoading ?
          (<View style={styles.containerLoading}>
            <ActivityIndicator size="large" />
          </View>) :

          (<ScrollView style={styles.containerScroll}>
            {displayMovieImage()}
            <View style={styles.containerCardTop}>
              <View style={styles.containerEstab}>
                <Text style={styles.textName}>
                  {movie.title}
                </Text>
                <Text style={styles.textContent}
                  numberOfLines={1}>
                  {movie.establishment?.join()}
                </Text>
              </View>
            </View>
            <View style={styles.containerCardBottom}>
              <Text style={[styles.textTitle, { marginTop: 0 }]}>
                Release
              </Text>
              <Text style={styles.textContent}>
                {movie.release_date}
              </Text>
              <Text style={styles.textTitle}>
                Genre
              </Text>
              <Text style={styles.textContent}>
                {movie.genres.reduce((previousValue, currentValue) => previousValue + ', ' + currentValue.name, "").substring(2)}
              </Text>
              <Text style={styles.textTitle}>
                Runtime
              </Text>
              <Text style={styles.textContent}>
                {movie.runtime}
              </Text>
              <Text style={styles.textTitle}>
                Overview
              </Text>
              <Text style={styles.textContent}>
                {movie.overview}
              </Text>
              <Text style={styles.textTitle}>
                Cast
              </Text>
              <Text style={styles.textContent}>
                {credits.reduce((previousValue, currentValue) => previousValue + ', ' + currentValue.name, "").substring(2)}
              </Text>
              {displaySaveMovie()}
            </View>
          </ScrollView>)
        )}
    </View>
  );
};

const mapStateToProps = (state) => {
  return {
    watchedMovies: state.watchedMoviesID
  }
}

export default connect(mapStateToProps)(Movie);

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  containerLoading: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  containerScroll: {
    flex: 1,
    paddingHorizontal: 12,
    paddingVertical: 16,
  },
  containerCardTop: {
    elevation: 1,
    borderRadius: 3,
    padding: 12,
    flexDirection: 'row',
    backgroundColor: 'white',
  },
  containerCardBottom: {
    elevation: 1,
    marginTop: 16,
    borderRadius: 3,
    padding: 12,
    backgroundColor: 'white',
  },
  containerNoMovieImage: {
    height: 128,
    alignItems: 'center',
    justifyContent: 'center',
    borderTopLeftRadius: 3,
    borderTopRightRadius: 3,
    backgroundColor: 'white',
  },
  MovieImage: {
    height: 180,
    borderTopLeftRadius: 3,
    borderTopRightRadius: 3,
  },
  containerEstab: {
    flex: 4,
  },
  containerNoteAndVotes: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  containerNote: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 3,
    flexDirection: 'row',
    alignItems: 'flex-end',
  },
  textNote: {
    color: 'white',
    fontWeight: "bold",
    fontSize: 16,
  },
  textMaxNote: {
    fontSize: 12,
    marginLeft: 3,
    color: 'white',
  },
  textVotes: {
    fontStyle: "italic",
    fontSize: 12,
  },
  textName: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  textTitle: {
    fontWeight: 'bold',
    fontSize: 16,
    marginTop: 16,
  },
  textContent: {
    fontSize: 16,
  },
});