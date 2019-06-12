import React, { Component, Fragment } from 'react';
import { Platform, StyleSheet, Text, View, TextInput } from 'react-native';
import {
  createMaterialTopTabNavigator,
  createAppContainer,
  createDrawerNavigator,
  createStackNavigator,
} from 'react-navigation';
import CurrentWeatherScreen from './components/CurrentWeatherScreen';
import FiveDaysMeteoScreen from './components/FiveDaysMeteoScreen';
import CommentsScreen from './components/CommentsScreen';
import TargetSearchTownScreen from './components/TargetSearchTownScreen';
import DrawerScreen from './components/DrawerScreen';

import { TownContext } from './context/Town';

const MainNavigator = createMaterialTopTabNavigator({
  Today: { screen: CurrentWeatherScreen },
  Later: { screen: FiveDaysMeteoScreen },
});

const DrawerNavigator = createDrawerNavigator(
  {
    Home: { screen: MainNavigator },
    Comments: { screen: CommentsScreen },
    Search: { screen: TargetSearchTownScreen },
  },
  {
    initialRouteName: 'Home',
    contentComponent: DrawerScreen,
    drawerWidth: 200,
  }
);

const AppContainer = createAppContainer(DrawerNavigator);

export default class App extends Component {
  state = {
    town: 'Paris',
    units: 'metric',
    toggleUnits: this.toggleUnits.bind(this),
  };

  componentDidMount = () => {
    this.getStorageValues();
  };

  toggleUnits() {
    this.setState(
      ({ units }) => ({ units: units === 'metric' ? 'imperial' : 'metric' }),
      () => this.setStorageValues('units', this.state.units)
    );
  }

  changeTownValue = town => {
    this.setStorageValues('town', town);
    this.setState({ town });
  };

  setStorageValues = async key => {
    try {
      await AsyncStorage.setItem(key);
    } catch (error) {
      console.error;
    }
  };

  getStorageValues = async () => {
    try {
      const town = await AsyncStorage.getItem('town');
      const units = await AsyncStorage.getItem('units');
      if (town !== null) {
        this.setState({ town });
      }
      if (units !== null) {
        this.setState({ units });
      }
    } catch (error) {
      console.error(e);
    }
  };

  onSubmitTownSearch = ({ nativeEvent: { text, eventCount, target } }) => {
    this.changeTownValue(text);
  };

  render() {
    return (
      <Fragment>
        <TextInput
          placeholder="Your town"
          onSubmitEditing={this.onSubmitTownSearch}
        />
        <TownContext.Provider value={this.state}>
          <AppContainer />
        </TownContext.Provider>
      </Fragment>
    );
  }
}
