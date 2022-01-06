import React, { useState, useEffect } from 'react';
import { View, TextInput, Button, StyleSheet, FlatList, Keyboard, Dimensions } from 'react-native';
import { connect } from 'react-redux';

import RestaurantlistItem from './RestaurantListItem';
import DisplayError from './DisplayError';

const Map = ({ navigation, favRestaurants }) => {

  const [restaurants, setRestaurants] = useState([]);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [isError, setIsError] = useState(false);

  const requestRestaurants = async (prevRestaurants, offset) => {
    setIsRefreshing(true);
    setIsError(false);
    try {
      setIsMoreResults(false);
    } catch (error) {
      setIsError(true);
      setRestaurants([]);
      setIsMoreResults(true);
      setNextOffset(0);
    }
    setIsRefreshing(false);
  };

  const searchRestaurants = () => {
    Keyboard.dismiss();
    requestRestaurants([], 0);
  };

  const loadMoreRestaurants = () => {
    if (isMoreResults) {
      requestRestaurants(restaurants, nextOffset);
    };
  };

  const navigateToRestaurantDetails = (restaurantID) => {
    navigation.navigate("ViewRestaurant", { restaurantID });
  };

  const amIaFavRestaurant = (restaurantID) => {
    if (favRestaurants.findIndex(i => i === restaurantID) !== -1) {
      return true;
    }
    return false;
  };

  return (
    <View style={styles.container}>
      <View style={styles.searchContainer}>

      </View>
      {
        isError ?
          (<DisplayError message='Impossible de récupérer les restaurants' />) :
          (<FlatList
            data={restaurants}
            extraData={favRestaurants}
            keyExtractor={(item) => item.restaurant.id.toString()}
            renderItem={({ item }) => (
              <RestaurantlistItem
                restaurantData={item.restaurant}
                onClick={navigateToRestaurantDetails}
                isFav={amIaFavRestaurant(item.restaurant.id)} />
            )}
            onEndReached={loadMoreRestaurants}
            onEndReachedThreshold={0.5}
            refreshing={isRefreshing}
            onRefresh={searchRestaurants}
          />)
      }
    </View>
  );
};

const mapStateToProps = (state) => {
  return {
    favRestaurants: state.favRestaurantsID
  }
}

export default connect(mapStateToProps)(Map);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 12,
    marginTop: 16,
  },
  searchContainer: {
    marginBottom: 16,
  },
  inputRestaurantName: {
    marginBottom: 8,
  },
});