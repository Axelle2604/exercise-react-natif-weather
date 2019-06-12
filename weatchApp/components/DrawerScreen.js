import React, { Component } from 'react';
import { NavigationActions, DrawerActions } from 'react-navigation';
import { Text, View, Button } from 'react-native';
import styled from 'styled-components';
import { TownContext } from '../context/Town';

class DrawerScreen extends Component {
  navigateToScreen = route => {
    this.props.navigation.navigate(route);
    this.props.navigation.dispatch(DrawerActions.closeDrawer());
  };

  render() {
    return (
      <View>
        <View>
          <ButtonMenu
            style={{ flexDirection: 'row', justifyContent: 'space-around' }}
          >
            <TownContext.Consumer>
              {({ toggleUnits, units }) => (
                <View style={{ flexDirection: 'row' }}>
                  <Button
                    title="F°"
                    onPress={toggleUnits}
                    disabled={units === 'imperial' ? true : false}
                  />
                  <Button
                    title="C°"
                    onPress={toggleUnits}
                    disabled={units === 'metric' ? true : false}
                  />
                </View>
              )}
            </TownContext.Consumer>
          </ButtonMenu>
          <ButtonMenu>
            <Text onPress={this.navigateToScreen.bind(this, 'Home')}>
              Meteo
            </Text>
          </ButtonMenu>
          <ButtonMenu>
            <Text onPress={this.navigateToScreen.bind(this, 'Comments')}>
              Comments
            </Text>
          </ButtonMenu>
          <ButtonMenu>
            <Text onPress={this.navigateToScreen.bind(this, 'Search')}>
              Search
            </Text>
          </ButtonMenu>
        </View>
      </View>
    );
  }
}
const ButtonMenu = styled(View)`
  padding: 10%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export default DrawerScreen;
