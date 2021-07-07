import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Router, Scene, Stack } from 'react-native-router-flux';

// Screens
import Login from './src/screens/Auth/Login';

export default function App() {
  return (
    <Router>
      <Stack>
        <Scene key="login" component={Login} title="Login" />
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
