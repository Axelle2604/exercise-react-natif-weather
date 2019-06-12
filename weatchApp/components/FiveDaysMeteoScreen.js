import React, { Component, Fragment } from 'react';
import { AsyncStorage, Text, View } from 'react-native';
import { getFiveNextDaysWeatherByCityName } from '../services/apiCalls';
import { TownContext } from '../context/Town';

class FiveDaysMeteoScreen extends Component {
  state = {
    town: this.context.town,
    units: this.context.units,
    weather: {},
    isLoading: true,
  };

  componentDidMount = () => {
    console.log(this.context);
    const { town } = this.context;
    this.fetchFiveNextDaysWeatherByCityName(town);
  };

  componentDidUpdate = () => {
    const { town, units } = this.context;
    if (this.state.town !== town) {
      this.setState({ town }, () =>
        this.fetchFiveNextDaysWeatherByCityName(town)
      );
    }
    if (this.state.units !== units) {
      this.setState({ units }, () =>
        this.fetchFiveNextDaysWeatherByCityName(town)
      );
    }
  };

  fetchFiveNextDaysWeatherByCityName = async cityName => {
    try {
      const { units } = this.state;
      console.log('av', cityName, units);
      const weather = await getFiveNextDaysWeatherByCityName(cityName, units);
      this.setState({ weather, isLoading: false });
    } catch (e) {
      console.error(e);
    }
  };

  render() {
    const {
      weather: { list },
      isLoading,
    } = this.state;
    console.log(list);
    const loader = isLoading && (
      <View>
        <Text>Loading</Text>
      </View>
    );
    const meteo = !isLoading && (
      <View>
        {list.map(({ main, weather }) => {
          return (
            <TownContext.Consumer>
              {({ units }) => (
                <View>
                  <Text>Temp. : {units}</Text>
                  <Text>Temp. min. : {main.temp_min}</Text>
                  <Text>Temp. max. : {main.temp_max}</Text>
                  <Text>
                    {weather.main} : {weather.description}
                  </Text>
                </View>
              )}
            </TownContext.Consumer>
          );
        })}
      </View>
    );
    //return loader || meteo;
    return loader;
  }
}

export default FiveDaysMeteoScreen;
