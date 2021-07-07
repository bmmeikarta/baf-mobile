import React from "react"
import { StyleSheet, View, SafeAreaView, TouchableOpacity, StatusBar } from "react-native"
import {
    Button,
    Icon,
    ListItem,
    Text,
    Header
} from "react-native-elements"
import { useDispatch, useSelector } from "react-redux"
import { FlatGrid, SectionGrid } from 'react-native-super-grid';
import { Actions } from "react-native-router-flux";
import NetInfo from '@react-native-community/netinfo'
import Modal from 'react-native-modalbox';
import * as Progress from 'react-native-progress';

import ApiConnection from "../../configs/apiConnections";

const AppsHome = () => {
    const Auth = useSelector(state => state.AuthInfo);
    const Master = useSelector(state => state.Master);

    const dispatch = useDispatch()
    const [connection, setConnection] = React.useState(true)
    const [viewDataStore, setViewDataStore] = React.useState(false)
    const [loadingUnit, setLoadingUnit] = React.useState(0)
    const [loadingSchedule, setLoadingSchedule] = React.useState(0)

    React.useEffect(() => {
        const unsubscribe = NetInfo.addEventListener(state => {
            console.log('Connection type', state.type);
            setConnection(state.isConnected)
            if (state.isConnected) {
            }
        });

        let updateData = setInterval(() => {
            getUnits()
            getScheduleNow()
        }, 30000);

        return () => {
            unsubscribe();
            clearInterval(updateData)
            updateData = null
        };
    }, [JSON.stringify(Auth)])

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
            setLoadingSchedule(2)
            dispatch({ type: 'SET_NOW_SCHEDULE', payload: send.data.data })

            setTimeout(() => {
                setLoadingSchedule(0)
            }, 3000);
        }
    }

    return <SafeAreaView style={styles.container}>
        <Header
            leftComponent={{}}
            centerComponent={{ text: 'HOME', style: { color: '#fff' } }}
            rightComponent={
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
                                type='font-awesome'
                                name='wifi-off'
                                size={20}
                            />
                    }
                </TouchableOpacity>
            }
            barStyle="light-content"
        />
        <View style={styles.isi}>
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
                    <ListItem.Subtitle>Status</ListItem.Subtitle>
                    </ListItem.Content>
                    <ListItem.Chevron 
                        reverse
                        name={
                            Object.keys(Master.mkrt_unit).length > 0
                            ? loadingUnit === 0 
                              ? 'database-check'
                              : loadingUnit === 1
                                ? 'database-sync'
                                : 'database-plus'
                            : 'database-remove'
                        }
                        type='material-community'
                        color={
                            Object.keys(Master.mkrt_unit).length > 0
                            ? loadingUnit === 0 
                              ? 'green'
                              : loadingUnit === 1
                                ? 'orange'
                                : 'cyan'
                            : 'red'
                        }
                        onPress={() => console.log('hello')}
                        size={20}
                    />
                </ListItem>
                <ListItem bottomDivider>
                    <ListItem.Content>
                    <ListItem.Title>Data Schedule</ListItem.Title>
                    <ListItem.Subtitle>Status</ListItem.Subtitle>
                    </ListItem.Content>
                    <ListItem.Chevron 
                        raised
                        name='heartbeat'
                        type='font-awesome'
                        color='#f50'
                        onPress={() => console.log('hello')}
                        size={20}
                    />
                </ListItem>
            </Modal>
            {
                <SectionGrid
                    itemDimension={155}
                    sections={Auth.parsedMenu}
                    style={styles.gridView}
                    renderItem={({ item, section, index }) => (
                        <TouchableOpacity onPress={() => Actions[item.menu_url]()}>
                            <View style={[styles.itemContainers, { backgroundColor: '#ff983d' }]}>
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
                    )}
                    renderSectionHeader={({ section }) => (
                        <Text style={styles.sectionHeader}>{section.title}</Text>
                    )}
                />
            }
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
        height: 500
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
        flex: 1,
    },
    itemContainers: {
        borderRadius: 5,
        padding: 10,
        height: 150,
        flexDirection: "column",
        alignItems: 'center',
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
        flex: 1,
        fontSize: 15,
        fontWeight: '600',
        alignItems: 'center',
        backgroundColor: '#4E598C',
        color: 'white',
        padding: 10,
    }
})

export default AppsHome