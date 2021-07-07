import React from "react";
import { Router, Scene, Stack, ActionConst } from 'react-native-router-flux';
import * as BackgroundFetch from "expo-background-fetch";
import * as TaskManager from "expo-task-manager";
import * as Permissions from "expo-permissions";
import { useDispatch, useSelector } from "react-redux";
import ApiConnection from "../configs/apiConnections";

// Screens
import Login from './Auth/Login';
import AppsHome from './Apps';

import Schedule from './Apps/BAF/Schedule';

import Report from './Apps/BAF/Report';
import ZoneChoose from './Apps/BAF/Report/zoneChoose';
import BAFReport from './Apps/BAF/Report/BAFReport';

import Resolve from './Apps/BAF/Resolve';

import Emergency from './Apps/BAF/Emergency';

const BACKGROUND_FETCH_TASK = "upload-job-task";

const Screens = () => {
    const dispatch = useDispatch()
    const Master = useSelector(state => state.Master);

    TaskManager.defineTask(BACKGROUND_FETCH_TASK, async () => {
        try {
            if (Master.historyStore.length > 0) {
                const send = await ApiConnection('post', '?mname=schedules&function=submitBAFHist', {
                    param: {
                        data: Master.historyStore
                    }
                });

                if (send.status === 'success') {
                    console.log(BACKGROUND_FETCH_TASK, "running");

                    return BackgroundFetch.Result.NewData
                }
            } else {
               return BackgroundFetch.Result.NoData
            }
        } catch (error) {
            return BackgroundFetch.Result.Failed;
        }
    })

    React.useEffect(() => {
        const initBackgroundFetch = async () => {
            console.log("initBackgroundFetch()");
            const backgroundFetchStatus = await BackgroundFetch.getStatusAsync();

            switch (backgroundFetchStatus) {
                case BackgroundFetch.Status.Restricted:
                    console.log("Background fetch execution is restricted");
                    return;

                case BackgroundFetch.Status.Denied:
                    console.log("Background fetch execution is disabled");
                    return;

                default:
                    console.log("Background fetch execution allowed");

                    const registered = await TaskManager.isTaskRegisteredAsync(
                        BACKGROUND_FETCH_TASK
                    );
                    if (registered) {
                        console.log("registered");
                    }

                    await BackgroundFetch.registerTaskAsync(BACKGROUND_FETCH_TASK, {
                        minimumInterval: 10,
                        startOnBoot: false,
                        stopOnTerminate: false
                    });
                    await BackgroundFetch.setMinimumIntervalAsync(600);
                    break;
            }
        }

        initBackgroundFetch();
    }, [])

    return <Router>
        <Stack>
            <Scene key="login" component={Login} title="Login" hideNavBar={true} navTransparent />
            <Scene key="home" component={AppsHome} title="Home" hideNavBar={true} />
            <Scene key="schedule" component={Schedule} title="Schedule" hideNavBar={true} navTransparent />

            <Scene key="check" component={Report} title="Report" hideNavBar={true} navTransparent />
            <Scene key="chooseZone" component={ZoneChoose} title="Choose Zone" hideNavBar={true} navTransparent />
            <Scene key="bafReport" component={BAFReport} title="BAF Report" hideNavBar={true} navTransparent />

            <Scene key="dos" component={Resolve} title="Resolve" hideNavBar={true} navTransparent />
            <Scene key="emergency" component={Emergency} title="Emergency" hideNavBar={true} navTransparent />
        </Stack>
    </Router>
}

export default Screens