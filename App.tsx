/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import React, {useState} from 'react';
import HomePage from './src/presentation/home.page';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {faPalette, faClose} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {Modal, TouchableOpacity, View} from 'react-native';
import {store, useStoreState} from './src/core/store/store';
import {StoreProvider, useStoreRehydrated} from 'easy-peasy';
import {Theme} from './src/core/themes/theme';
import ThemeSwitcherPage from './src/presentation/themeswitcher.page';

const Stack = createNativeStackNavigator();

const homeStackScreen = () => (
  <Stack.Screen
    name="Home"
    component={HomePage}
    options={{title: 'Personnages'}}
  />
);

const themeSwitcherStackScreen = (currentTheme: Theme) => (
  <Stack.Screen
    name="ThemeSwitcher"
    component={ThemeSwitcherPage}
    options={({navigation}) => ({
      presentation: 'modal',
      headerRight: () =>
        headerRightCloseModalButton(currentTheme, () => navigation.goBack()),
      title: 'Votre theme',
    })}
  />
);

const headerRightCloseModalButton = (
  currentTheme: Theme,
  onButtonPressed: () => void,
) => (
  <TouchableOpacity onPress={() => onButtonPressed()}>
    <FontAwesomeIcon
      icon={faClose}
      size={30}
      color={currentTheme.headerTitle}
    />
  </TouchableOpacity>
);
const headerRightOpenThemeSwitcherButton = (
  currentTheme: Theme,
  onButtonPressed: () => void,
) => (
  <TouchableOpacity onPress={() => onButtonPressed()}>
    <FontAwesomeIcon
      icon={faPalette}
      size={30}
      color={currentTheme.headerTitle}
    />
  </TouchableOpacity>
);

const App = () => {
  const currentTheme = useStoreState(state => state.theme);
  const isRehydrated = useStoreRehydrated();
  if (!isRehydrated) {
    return <View />;
  }
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Home"
        screenOptions={({navigation}) => ({
          headerStyle: {
            backgroundColor: currentTheme.headerBackground,
          },
          headerTitleStyle: {
            color: currentTheme.headerTitle,
            fontSize: 38,
          },
          headerRight: () =>
            headerRightOpenThemeSwitcherButton(currentTheme, () =>
              navigation.navigate('ThemeSwitcher'),
            ),
        })}>
        {homeStackScreen()}
        {themeSwitcherStackScreen(currentTheme)}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const WrappedApp = () => {
  return (
    <StoreProvider store={store}>
      <App />
    </StoreProvider>
  );
};

export default WrappedApp;
