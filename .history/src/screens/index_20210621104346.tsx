import React from "react";
import { Router, Scene, Stack, ActionConst } from 'react-native-router-flux';

// Screens
import Login from './Auth/Login';
import AppsHome from './Apps';

import Schedule from './Apps/BAF/Schedule';

import Report from './Apps/BAF/Report';
import ZoneChoose from './Apps/BAF/Report/zoneChoose';
import BAFReport from './Apps/BAF/Report/BAFReport';

import Resolve from './Apps/BAF/Resolve';

import Emergency from './Apps/BAF/Emergency';

const Screens = () => {
    return <Router>
      <Stack>
        <Scene key="login" component={Login} title="Login" hideNavBar={true} navTransparent />
        <Scene key="home" component={AppsHome} title="Home" hideNavBar={true} />
        <Scene key="schedule" component={Schedule} title="Schedule" hideNavBar={true} navTransparent/>
        
        <Scene key="check" component={Report} title="Report" hideNavBar={true} navTransparent/>
        <Scene key="chooseZone" component={ZoneChoose} title="Choose Zone" hideNavBar={true} navTransparent/>
        <Scene key="bafReport" component={BAFReport} title="BAF Report" hideNavBar={true} navTransparent/>

        <Scene key="dos" component={Resolve} title="Resolve" hideNavBar={true} navTransparent/>
        <Scene key="emergency" component={Emergency} title="Emergency" hideNavBar={true} navTransparent/>
      </Stack>
    </Router>
}

export default Screens