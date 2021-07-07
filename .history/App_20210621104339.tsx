import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'
import { store, persistor } from './src/configs/storeConfig'
import { ThemeProvider, Header } from 'react-native-elements'

import Screens from './src/screens';
export default function App() {
  return (
    <View style={{flex: 1, top: 0}}>
      <StatusBar translucent backgroundColor="transparent" />
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <React.Fragment>
            <ThemeProvider>
              <Screens />
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
