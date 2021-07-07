import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Router, Scene, Stack, ActionConst } from 'react-native-router-flux';
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'
import { store, persistor } from './src/configs/storeConfig'
import { ThemeProvider, Header } from 'react-native-elements'

// Screens
import Login from './src/screens/Auth/Login';
import AppsHome from './src/screens/Apps';

export default function App() {
  return (
    <View style={{flex: 1, top: 0}}>
      <StatusBar translucent backgroundColor="transparent" />
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <React.Fragment>
            <ThemeProvider>
              <Router>
                <Stack>
                  <Scene key="login" component={Login} title="Login" hideNavBar={true} navTransparent />
                  <Scene key="home" component={AppsHome} title="Home" hideNavBar={true} />
                </Stack>
              </Router>
            </ThemeProvider>
          </React.Fragment>
        </PersistGate>
      </Provider>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
