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

import Schedule from './src/screens/Apps/BAF/Schedule/schedule_be';

import Report from './src/screens/Apps/BAF/Report';
import ZoneChoose from './src/screens/Apps/BAF/Report/zoneChoose';
import BAFReport from './src/screens/Apps/BAF/Report/BAFReport';
import BAFChoose from './src/screens/Apps/BAF/Report/BAFChoose';

import Resolve from './src/screens/Apps/BAF/Resolve';

import Emergency from './src/screens/Apps/BAF/Emergency';

import OpenPhoto from './src/screens/Tools/OpenPhoto';
import ViewCategory from './src/screens/Tools/ViewCategory';

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
                  <Scene key="schedule" component={Schedule} title="Schedule" hideNavBar={true} navTransparent/>
                  
                  <Scene key="check" component={Report} title="Report" hideNavBar={true} navTransparent/>
                  <Scene key="chooseZone" component={ZoneChoose} title="Choose Zone" hideNavBar={true} navTransparent/>
                  <Scene key="bafReport" component={BAFChoose} title="BAF Report" hideNavBar={true} navTransparent/>

                  <Scene key="dos" component={Resolve} title="Resolve" hideNavBar={true} navTransparent/>
                  <Scene key="emergency" component={Emergency} title="Emergency" hideNavBar={true} navTransparent/>

                  <Scene key="openPhoto" component={OpenPhoto} title="Open Photo" hideNavBar={true} navTransparent/>
                  <Scene key="viewCat" component={ViewCategory} title="View Category" hideNavBar={true} navTransparent/>
                  
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
