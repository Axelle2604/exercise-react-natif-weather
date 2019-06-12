import React, { Component, Fragment } from 'react';
import { Text, View, TextInput, AsyncStorage } from 'react-native';
import styled from 'styled-components';
import { getWeatherByCityName } from '../services/apiCalls';
import { TownContext } from '../context/Town';

class CurrentWeatherScreen extends Component {
  static contextType = TownContext;

  state = {
    town: this.context.town,
    units: this.context.units,
    weather: {},
    isLoading: true,
  };

  componentDidMount = () => {
    const { town } = this.state;
    this.fetchCurrentWeatherByCityName(town);
  };

  componentDidUpdate = () => {
    const { town, units } = this.context;
    if (this.state.town !== town) {
      this.setState({ town }, () => this.fetchCurrentWeatherByCityName(town));
    }
    if (this.state.units !== units) {
      console.log('ch');
      this.setState({ units }, () => this.fetchCurrentWeatherByCityName(town));
    }
  };

  fetchCurrentWeatherByCityName = async cityName => {
    const { units } = this.state;
    try {
      const weather = await getWeatherByCityName(cityName, units);
      this.setState({ weather, isLoading: false });
    } catch (e) {
      console.error(e);
    }
  };

  render() {
    const { weather, isLoading } = this.state;
    const { name, main, weather: currWeather } = weather;
    const loader = isLoading && (
      <View>
        <Text>Loading</Text>
      </View>
    );
    const meteo = !isLoading && (
      <ScreenContainer>
        <TownContext.Consumer>
          {({ town }) => (
            <View>
              <Text>{town}</Text>
              <Text>Temp : {town}</Text>
              <Text>Temp min. : {main.temp_min}</Text>
              <Text>Temp max. : {main.temp_max}</Text>
              {currWeather.map(({ main, description, id }) => (
                <Text key={id}>
                  {main} : {description}
                </Text>
              ))}
            </View>
          )}
        </TownContext.Consumer>
      </ScreenContainer>
    );
    return loader || meteo;
  }
}
const ScreenContainer = styled(View)``;

export default CurrentWeatherScreen;
