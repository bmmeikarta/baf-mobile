import React from "react"
import {
    StyleSheet,
    View,
    SafeAreaView,
    TouchableOpacity,
    Dimensions,
    BackHandler,
    Alert
} from "react-native"
import {
    Button,
    Icon,
    ListItem,
    Text,
    Header,
    FAB
} from "react-native-elements"
import { useDispatch, useSelector } from "react-redux"
import { FlatGrid, SectionGrid } from 'react-native-super-grid';
import { Actions } from "react-native-router-flux";
import NetInfo from '@react-native-community/netinfo'
import Modal from 'react-native-modalbox';
import { Row, Column as Col, Grid } from 'react-native-responsive-grid'

import ApiConnection from "../../configs/apiConnections";
import LoadingHome from './loading'

const windowWidth = Dimensions.get('window').width;

const AppsHome = () => {
    const Auth = useSelector(state => state.AuthInfo);
    const Master = useSelector(state => state.Master);

    const dispatch = useDispatch()
    const [connection, setConnection] = React.useState(true)
    const [viewDataStore, setViewDataStore] = React.useState(false)
    const [loadingUnit, setLoadingUnit] = React.useState(0)
    const [loadingSchedule, setLoadingSchedule] = React.useState(0)
    const [loadingCategory, setLoadingCategory] = React.useState(0)
    const [loadingSubmit, setLoadingSubmit] = React.useState(0)

    React.useEffect(() => {
        console.log(Actions.currentScene)
    }, [])

    React.useEffect(() => {
        console.log(Auth.parsedMenu.length)
        const unsubscribe = NetInfo.addEventListener(state => {
            console.log('Connection type', state.type);
            setConnection(state.isConnected)
            if (state.isConnected) {
            }
        });

        let updateData = setInterval(() => {
            getUnits()
            getScheduleNow()
            getCategory()
            // uploadDataToServer()
            // processingStoredData()
        }, 30000);

        if (Auth) {
            if (!Auth.username || Auth.username === '') {
                Actions.pop()
            }
        }

        return () => {
            unsubscribe();
            clearInterval(updateData)
            updateData = null
        };
    }, [JSON.stringify(Auth)])

    React.useEffect(() => {
        console.log(Actions.currentScene)
        if (Actions.currentScene === 'home') {
            BackHandler.addEventListener("hardwareBackPress", onLogout);

            return () => BackHandler.removeEventListener("hardwareBackPress", onLogout);
        } else {
            console.log(Actions.currentScene)
        }
    }, [Actions.currentScene])
    const getUnits = async () => {
        setLoadingUnit(1)
        const send = await ApiConnection('get', '?mname=schedules&function=getListFloor');

        // console.log(send)
        if (send.status === 'success') {
            setLoadingUnit(2)
            dispatch({ type: 'SET_MKRT_UNIT', payload: send.data.data })

            setTimeout(() => {
                setLoadingUnit(0)
            }, 3000);
        }
    }

    const getScheduleNow = async () => {
        setLoadingSchedule(1)
        const send = await ApiConnection('post', '?mname=schedules&function=getTowerSchedule', {
            param: {
                users: Auth.username
            }
        });

        if (send.status === 'success') {
            // console.log(send.data.data)
            setLoadingSchedule(2)
            dispatch({ type: 'SET_NOW_SCHEDULE', payload: send.data.data })

            setTimeout(() => {
                setLoadingSchedule(0)
            }, 3000);
        } else {
            setTimeout(() => {
                setLoadingSchedule(0)
            }, 3000);
        }
    }

    const getCategory = async () => {
        setLoadingCategory(1)
        const send = await ApiConnection('post', '?mname=schedules&function=getCategoryBAF');

        if (send.status === 'success') {
            setLoadingCategory(2)
            dispatch({ type: 'SET_CATEGORY_LIST', payload: send.data.data })

            setTimeout(() => {
                setLoadingCategory(0)
            }, 3000);
        } else {
            setTimeout(() => {
                setLoadingCategory(0)
            }, 3000);
        }
    }

    const processingStoredData = async () => {
        setLoadingSubmit(1)

        const hasil = []
        console.log('mulai')
        // console.log(Master.historyStore.length)
        for (let index = 0; index < Master.historyStore.length; index++) {
            const element = Master.historyStore[index];
            const processing = await uploadDataToServer(element, index)
            if (processing.status === 'success') {
                console.log(processing)
                hasil.push(index)
            }
        }

        // DELETE_PENDING_HISTORY
        dispatch({ type: 'DELETE_PENDING_HISTORY', payload: { idx: hasil } })
        console.log('berhasil')
        console.log(Master.historyStore.length)

        // console.log(hasil)
        setLoadingSubmit(2)
        setTimeout(() => {
            setLoadingSubmit(0)
        }, 3000);
    }

    const uploadDataToServer = async (datas: any, idx: any) => {
        const send = await ApiConnection('post', '?mname=schedules&function=submitBAFHist', {
            datas: datas,
            users: Auth.username,
            idx: idx
        });

        return send
    }

    const onLogout = () => {
        Alert.alert(
            "Logout",
            "Apakah anda ingin logout dari akun anda ?",
            [
                {
                    text: "Cancel",
                    onPress: () => { },
                    style: "cancel",
                },
                {
                    text: "logout",
                    onPress: () => {
                        dispatch({
                            type: 'SET_LOGIN_STATE', payload: {
                                username: '',
                                first_name: '',
                                email: '',
                                menuDetail: '',
                                isLoggedIn: false,
                            }
                        })

                        Actions.pop()
                    }
                }
            ]
        )

        return true
    }

    const renderView = (item: any) => {
        return <TouchableOpacity onPress={() => Actions[item.menu_url]()}>
            <View style={[styles.itemContainers, { backgroundColor: '#ff983d' }, item.menu_wide == 1 ? { width: windowWidth - 20 } : { width: 120 }]}>
                <Icon
                    style={styles.icon}
                    color='white'
                    type='font-awesome'
                    name={item.menu_icon}
                    size={50}
                />
                <View style={{
                    height: '100%',
                    alignItems: 'center',
                    paddingTop: 15
                }}>
                    <Text style={styles.itemName}>{item.menu_name}</Text>
                    <Text style={styles.itemCode}>{item.menu_desc}</Text>
                </View>
            </View>
        </TouchableOpacity>
    }

    const viewLayout = () => {
        return <Row style={{ backgroundColor: 'white', padding: 10 }}>
            {Auth.parsedMenu.map((item: any) => (
                <>
                    <Col size={100}>
                        <View style={{ backgroundColor: '#4E598C' }}>
                            <Text style={styles.sectionHeader}>{item.title}</Text>
                        </View>
                    </Col>
                    {
                        item.data.map((det: any) => (
                            det.menu_wide == 1
                            ? <Col size={100}>
                                {renderView(det)}
                            </Col>
                            : <Col size={30}>
                            {renderView(det)}
                            </Col>
                        ))
                    }
                </>
            ))}
        </Row>
    }

    return <SafeAreaView style={styles.container}>
        <Header
            leftComponent={
                <TouchableOpacity onPress={() => setViewDataStore(true)}>
                    {
                        connection
                            ? <Icon
                                style={styles.icon}
                                color='white'
                                type='font-awesome'
                                name='wifi'
                                size={20}
                            />
                            : <Icon
                                style={styles.icon}
                                color='white'
                                type='material-community'
                                name='wifi-off'
                                size={20}
                            />
                    }
                </TouchableOpacity>
            }
            centerComponent={{ text: 'HOME', style: { color: '#fff' } }}
            rightComponent={<TouchableOpacity onPress={() => onLogout()}>
                <Icon
                    style={styles.icon}
                    color='white'
                    type='material'
                    name='exit-to-app'
                    size={20}
                />
            </TouchableOpacity>}
            barStyle="light-content"
        />
        <View style={styles.isi}>
            {
                Auth.parsedMenu.length > 0
                    ? viewLayout()
                    : <LoadingHome />
            }

            <Modal isOpen={viewDataStore} style={[styles.modal4]} position={"bottom"} onClosed={() => setViewDataStore(false)}>
                <ListItem bottomDivider>
                    <ListItem.Content>
                        <ListItem.Title>Connection Status</ListItem.Title>
                    </ListItem.Content>
                    {
                        connection
                            ? <ListItem.Chevron
                                reverse
                                name='lan-connect'
                                type='material-community'
                                color='green'
                                onPress={() => console.log('hello')}
                                size={20}
                            />
                            : <ListItem.Chevron
                                reverse
                                name='lan-disconnect'
                                type='material-community'
                                color='red'
                                onPress={() => console.log('hello')}
                                size={20}
                            />
                    }

                </ListItem>
                <ListItem bottomDivider>
                    <ListItem.Content>
                        <ListItem.Title>Data Unit</ListItem.Title>
                        <ListItem.Subtitle>{
                            Master.mkrt_unit && Object.keys(Master.mkrt_unit).length > 0
                                ? loadingUnit === 0
                                    ? 'Data Unit Updated'
                                    : loadingUnit === 1
                                        ? 'Synchronizing Data'
                                        : 'Synchronizing Complete'
                                : 'Data Unit Not Found !'
                        }</ListItem.Subtitle>
                    </ListItem.Content>
                    <ListItem.Chevron
                        reverse
                        name={
                            Master.mkrt_unit && Object.keys(Master.mkrt_unit).length > 0
                                ? loadingUnit === 0
                                    ? 'database-check'
                                    : loadingUnit === 1
                                        ? 'database-sync'
                                        : 'database-plus'
                                : 'database-remove'
                        }
                        type='material-community'
                        color={
                            Master.mkrt_unit && Object.keys(Master.mkrt_unit).length > 0
                                ? loadingUnit === 0
                                    ? 'green'
                                    : loadingUnit === 1
                                        ? 'orange'
                                        : 'cyan'
                                : 'red'
                        }
                        onPress={() => getUnits()}
                        size={20}
                    />
                </ListItem>
                <ListItem bottomDivider>
                    <ListItem.Content>
                        <ListItem.Title>Data Schedule</ListItem.Title>
                        <ListItem.Subtitle>{
                            Object.keys(Master.schedule_now).length > 0
                                ? loadingSchedule === 0
                                    ? 'Data Schedule Updated'
                                    : loadingSchedule === 1
                                        ? 'Synchronizing Data'
                                        : 'Synchronizing Complete'
                                : 'Data Schedule Not Found !'
                        }</ListItem.Subtitle>
                    </ListItem.Content>
                    <ListItem.Chevron
                        reverse
                        name={
                            Object.keys(Master.schedule_now).length > 0
                                ? loadingSchedule === 0
                                    ? 'database-check'
                                    : loadingSchedule === 1
                                        ? 'database-sync'
                                        : 'database-plus'
                                : 'database-remove'
                        }
                        type='material-community'
                        color={
                            Object.keys(Master.schedule_now).length > 0
                                ? loadingSchedule === 0
                                    ? 'green'
                                    : loadingSchedule === 1
                                        ? 'orange'
                                        : 'cyan'
                                : 'red'
                        }
                        onPress={() => getScheduleNow()}
                        size={20}
                    />
                </ListItem>
                <ListItem bottomDivider>
                    <ListItem.Content>
                        <ListItem.Title>Data Category</ListItem.Title>
                        <ListItem.Subtitle>{
                            Master.categoryList.length > 0
                                ? loadingCategory === 0
                                    ? 'Data Category Updated'
                                    : loadingCategory === 1
                                        ? 'Synchronizing Data'
                                        : 'Synchronizing Complete'
                                : 'Data Category Not Found !'
                        }</ListItem.Subtitle>
                    </ListItem.Content>
                    <ListItem.Chevron
                        reverse
                        name={
                            Master.categoryList.length > 0
                                ? loadingSubmit === 0
                                    ? 'database-check'
                                    : loadingSubmit === 1
                                        ? 'database-sync'
                                        : 'database-plus'
                                : 'database-remove'
                        }
                        type='material-community'
                        color={
                            Master.categoryList.length > 0
                                ? loadingCategory === 0
                                    ? 'green'
                                    : loadingCategory === 1
                                        ? 'orange'
                                        : 'cyan'
                                : 'red'
                        }
                        onPress={() => getCategory()}
                        size={20}
                    />
                </ListItem>
                <ListItem bottomDivider>
                    <ListItem.Content>
                        <ListItem.Title>Pending Submited Data</ListItem.Title>
                        <ListItem.Subtitle>{
                            Master.historyStore.length > 0
                                ? loadingSubmit === 0
                                    ? `Pending Upload Data ${Master.historyStore.length} !`
                                    : loadingSubmit === 1
                                        ? 'Synchronizing Data'
                                        : 'Synchronizing Complete'
                                : 'There is no pending data'
                        }</ListItem.Subtitle>
                    </ListItem.Content>
                    <ListItem.Chevron
                        reverse
                        name={
                            Master.historyStore.length > 0
                                ? loadingSubmit === 0
                                    ? 'database-export'
                                    : loadingSubmit === 1
                                        ? 'database-sync'
                                        : 'database-plus'
                                : 'database-check'
                        }
                        type='material-community'
                        color={
                            Master.historyStore.length > 0
                                ? loadingSubmit === 0
                                    ? 'orange'
                                    : loadingSubmit === 1
                                        ? 'orange'
                                        : 'cyan'
                                : 'green'
                        }
                        onPress={() => processingStoredData()}
                        size={20}
                    />
                </ListItem>
            </Modal>
        </View>
    </SafeAreaView>
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        // backgroundColor: '#ffb029',
        backgroundColor: '#fff',
        flexDirection: "column"
    },
    modal: {
        justifyContent: 'center',
        alignItems: 'center'
    },
    modal4: {
        height: 600
    },
    isi: {
        backgroundColor: 'rgba(255, 255, 255, 0)',
        alignItems: 'center',
        height: '100%'
    },
    logo: {
        width: 250,
        height: 250
    },
    input: {
        top: 10,
        width: '100%',
        padding: 10
    },
    buttonStyle: {
        borderRadius: 20
    },
    gridView: {
        marginTop: 10,
        width: windowWidth,
        maxHeight: '100%',
        justifyContent: 'center'
    },
    itemContainers: {
        borderRadius: 5,
        padding: 10,
        flexDirection: "column",
        alignItems: 'center',
        height: 110
    }, itemName: {
        fontSize: 16,
        color: 'white',
        fontWeight: '600',
    },
    itemCode: {
        fontWeight: '600',
        fontSize: 12,
        color: 'white',
    },
    sectionHeader: {
        fontSize: 15,
        fontWeight: '600',
        alignItems: 'center',
        color: 'white',
        padding: 10,
    }
})

export default AppsHome