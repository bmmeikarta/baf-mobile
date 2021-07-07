import React from "react"
import { StyleSheet, View, SafeAreaView, TouchableOpacity, StatusBar } from "react-native"
import {
    Button,
    Icon,
    Input,
    Text,
    Header
} from "react-native-elements"
import { useDispatch, useSelector } from "react-redux"
import { FlatGrid, SectionGrid } from 'react-native-super-grid';
import { Actions } from "react-native-router-flux";
import NetInfo from '@react-native-community/netinfo'

import ApiConnection from "../../configs/apiConnections";

const AppsHome = () => {
    const Auth = useSelector(state => state.AuthInfo);

    const dispatch = useDispatch()
    const [connection, setConnection] = React.useState(true)

    React.useEffect(() => {
        const unsubscribe = NetInfo.addEventListener(state => {
            console.log('Connection type', state.type);
            setConnection(state.isConnected)
            if (state.isConnected) {
            }
        });

        let updateData = setTimeout(() => {
            getUnits()
            getScheduleNow()
        }, 5000);

        return () => {
            unsubscribe();
            clearTimeout(updateData)
            updateData = null
        };        
    }, [JSON.stringify(Auth)])

    const getUnits = async () => {
        const send = await ApiConnection('get', '?mname=schedules&function=getListFloor');

        // console.log(send)
        if (send.status === 'success') {
            console.log('update units done')
            dispatch({ type: 'SET_MKRT_UNIT', payload: send.data.data })
        }
    }

    const getScheduleNow = async () => {
        const send = await ApiConnection('post', '?mname=schedules&function=getTowerSchedule', {
            param: {
                users: Auth.username
            }
        });

        if (send.status === 'success') {
            console.log('update schedule done')
            dispatch({ type: 'SET_NOW_SCHEDULE', payload: send.data.data })
        }
    }

    return <SafeAreaView style={styles.container}>
        <Header
            leftComponent={{}}
            centerComponent={{ text: 'HOME', style: { color: '#fff' } }}
            rightComponent={connection 
                ? { icon: 'wifi', color: '#fff' }
                : { icon: 'wifi-off', color: '#fff' }
            }
            barStyle="light-content"
        />
        <View style={styles.isi}>
            {
                <SectionGrid
                    itemDimension={155}
                    sections={Auth.parsedMenu}
                    style={styles.gridView}
                    renderItem={({ item, section, index }) => (
                        <TouchableOpacity onPress={() => Actions.report() }>
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