import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { View } from 'react-native';

import Search from '../components/Search';
import Movie from '../components/Movie';
import WatchList from '../components/WatchList';

const SearchNavigation = createStackNavigator();
const FavNavigation = createStackNavigator();
const TabNavigation = createBottomTabNavigator();

function searchStackScreens() {
  return (
    <SearchNavigation.Navigator
      initialRouteName="ViewSearch"
    >
      <SearchNavigation.Screen
        name="ViewSearch"
        component={Search}
        options={{ title: 'Recherche' }}
      />
      <SearchNavigation.Screen
        name="ViewMovie"
        component={Movie}
        options={{ title: 'Film' }}
      />
    </SearchNavigation.Navigator>
  )
};

function favStackScreens() {
  return (
    <FavNavigation.Navigator
      initialRouteName="ViewFav"
    >
      <FavNavigation.Screen
        name="ViewFav"
        component={WatchList}
        options={{ title: 'Favoris' }}
      />
      <FavNavigation.Screen
        name="ViewMovie"
        component={Movie}
        options={{ title: 'Film' }}
      />
    </FavNavigation.Navigator>
  )
};

function RootStack() {
  return (
    <TabNavigation.Navigator
      screenOptions={{
        headerShown: false
      }}>
      <TabNavigation.Screen
        name="Recherche"
        component={searchStackScreens}
        options={() => ({
          tabBarIcon: ({ color }) => {
            return <View style={{ tintColor: color }} />;
          }
        })}
      />
      <TabNavigation.Screen
        name="Watchlist"
        component={favStackScreens}
        options={() => ({
          tabBarIcon: ({ color }) => {
            return <View style={{ tintColor: color }} />;
          }
        })}
      />
    </TabNavigation.Navigator>
  );
}

export default RootStack;