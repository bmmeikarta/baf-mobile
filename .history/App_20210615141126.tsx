import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Router, Scene, Stack } from 'react-native-router-flux';
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'
import { store, persistor } from './src/configs/storeConfig'

// Screens
import Login from './src/screens/Auth/Login';
import AppsHome from './src/screens/Apps';

export default function App() {
  return (
    <Router>
      <Stack>
        <Scene key="login" component={Login} title="Login" hideNavBar={true}/>
        <Scene key="home" component={AppsHome} title="Home" />
      </Stack>
    </Router>
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
