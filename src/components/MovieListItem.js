import React from 'react';
import { View, StyleSheet, Image, Text, TouchableOpacity } from 'react-native';

const MovieListItem = ({ onClick, movieData }) => {

  const getThumbnail = () => {
    /*if (movieData.thumb) {
      return (
        <Image style={styles.thumbnail} source={{ uri: movieData.thumb }} />
      );
    };*/
    return (
      <View style={styles.noThumbnailContainer}>
      </View>
    );
  };

  return (
    <TouchableOpacity style={styles.container}
      onPress={() => { onClick(movieData.id) }}>
      {getThumbnail()}
      <View style={styles.informationContainer}>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>
            {movieData.title}
          </Text>
        </View>
        <Text style={[styles.data, styles.cuisine]}
          numberOfLines={1}>
          {movieData.release_date}
        </Text>
        <View style={styles.statContainer}>
            <Text style={[styles.data, styles.stat]}
              numberOfLines={2}>
              {movieData.overview}
            </Text>
          </View>
        <View style={styles.statsContainer}>
          <View style={styles.statContainer}>
            <Text style={[styles.data, styles.stat]}>
              {movieData.vote_average}
            </Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default MovieListItem;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    paddingVertical: 8,
  },
  informationContainer: {
    flex: 1,
    marginLeft: 12,
    justifyContent: 'center',
  },
  titleContainer: {
    flexDirection: 'row',
  },
  statsContainer: {
    flexDirection: 'row',
    marginTop: 12,
  },
  statContainer: {
    flexDirection: 'row',
    marginRight: 8,
  },
  noThumbnailContainer: {
    width: 128,
    height: 128,
    alignItems: 'center',
    justifyContent: 'center',
  },
  thumbnail: {
    width: 128,
    height: 128,
    borderRadius: 12,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  data: {
    fontSize: 16,
  },
  cuisine: {
    fontStyle: 'italic',
  },
  stat: {
    marginLeft: 4,
  },
});