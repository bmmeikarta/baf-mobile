import React from "react";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import { Text, Header, Icon, Button } from "react-native-elements";
import { Actions } from "react-native-router-flux";
import { useDispatch, useSelector } from "react-redux";
import Svg, { Circle, Rect, Text as TextSVG } from 'react-native-svg'
import Modal from 'react-native-modalbox';
import { BarCodeScanner } from 'expo-barcode-scanner';

const ZoneChoose = () => {
    const Master = useSelector(state => state.Master)
    const dispatch = useDispatch()

    const [scheduleUser, setScheduleUser] = React.useState({})
    const [choosedBlock, setChoosedBlock] = React.useState('')
    const [choosedTower, setChoosedTower] = React.useState('')
    const [scanQRCode, setScanQRCode] = React.useState(false)

    const [hasPermission, setHasPermission] = React.useState(null);
    const [scanned, setScanned] = React.useState(false);

    React.useEffect(() => {
        if (Object.keys(Master.mkrt_unit).length > 0) {
            setChoosedBlock(Master.schedule_now.unit_blocks)
            setChoosedTower(Master.schedule_now.unit_tower)

            if (Master.schedule_now) {
                setScheduleUser(Master.schedule_now)
            }
        }

        // QR Code
        (async () => {
            dispatch({ type: 'SET_CHOOSED_ZONE', payload: '' })
            const { status } = await BarCodeScanner.requestPermissionsAsync();
            setHasPermission(status === 'granted');
        })();

    }, [JSON.stringify(Master.schedule_now)])

    const onChooseZone = (zone: any) => {
        dispatch({ type: 'SET_CHOOSED_ZONE', payload: zone })
        setScanQRCode(true)
    }

    const handleBarCodeScanned = ({ type, data }) => {
        setScanned(true);
        dispatch({ type: 'SET_SCAN_ZONE', payload: data })
        Actions.BAFReport()
    };

    return <View style={styles.container}>
        <Header
            leftComponent={<Icon
                name='chevron-left'
                type='font-awesome'
                size={20}
                color="white"
                onPress={() => Actions.pop()} />
            }
            centerComponent={{ text: 'Choose Zone', style: { color: '#fff' } }}
            barStyle="light-content"
        />

        <View style={{
            padding: 10,
            flexDirection: 'column',
            flexWrap: 'wrap'
        }}>
            {
                Object.keys(scheduleUser).length > 0
                    ? <>
                        <View style={[styles.itemContainer, { backgroundColor: '#1abc9c' }]}>
                            <Text style={styles.itemName}>{scheduleUser.unit_blocks}</Text>
                        </View>

                        <View style={{
                            flex: 1,
                            flexDirection: 'row',
                            flexWrap: 'wrap',
                            alignItems: 'flex-start',
                            top: 10
                        }}>
                            {
                                Master.mkrt_unit[scheduleUser.unit_blocks]
                                    ? Object.keys(Master.mkrt_unit[scheduleUser.unit_blocks]).map(val => (
                                        <>
                                            <View style={{ width: `${100 / Object.keys(Master.mkrt_unit[scheduleUser.unit_blocks]).length}%` }}>
                                                <View style={[styles.itemContainer, scheduleUser.unit_tower == val ? { backgroundColor: '#1abc9c', opacity: 0.5 } : { backgroundColor: '#1abc9c' }]}>
                                                    <Text style={styles.itemName}>{val}</Text>
                                                </View>
                                            </View>
                                        </>
                                    ))
                                    : null
                            }
                        </View>
                    </>
                    : null
            }
        </View>

        <View style={{
            alignContent: 'center',
            alignSelf: 'center',
            justifyContent: 'center',
            height: '80%'
        }}>
            <TouchableOpacity onPress={() => onChooseZone(3)} style={{ width: 50, height: 80 }}>
                <View style={{ width: 50, height: 80, justifyContent: 'center' }}>
                    <Svg width="50" height="80">
                        <Rect
                            x="0"
                            y="0"
                            width="50"
                            height="80"
                            fill="blue"
                        />
                    </Svg>
                    <Text style={{ position: 'absolute', left: 3, color: 'white' }}>Zone 3</Text>
                </View>
            </TouchableOpacity>
            <TouchableOpacity style={{ width: 170, height: 50 }} onPress={() => onChooseZone(2)}>
                <View style={{ width: 170, height: 50, justifyContent: 'center' }}>
                    <Svg width="170" height="50">
                        <Rect
                            x="0"
                            y="0"
                            width="170"
                            height="50"
                            fill="#ffcea1"
                        />
                    </Svg>
                    <Text style={{ position: 'absolute', left: '50%' }}>Zone 2</Text>
                </View>
            </TouchableOpacity>
            <TouchableOpacity style={{ width: 50, height: 80 }} onPress={() => onChooseZone(4)}>
                <View style={{ width: 50, height: 80, justifyContent: 'center' }}>
                    <Svg width="50" height="80">
                        <Rect
                            x="0"
                            y="0"
                            width="50"
                            height="80"
                            fill="green"
                        />
                        <Text style={{ position: 'absolute', color: 'white', top: 30, left: 3 }}>Zone 4</Text>
                    </Svg>
                </View>
            </TouchableOpacity>
            <TouchableOpacity style={{ left: 170, bottom: 170, width: 50, height: 120 }} onPress={() => onChooseZone(1)}>
                <View style={{ width: 50, height: 120, justifyContent: 'center' }}>
                    <Svg width="50" height="120">
                        <Rect
                            x="0"
                            y="0"
                            width="50"
                            height="120"
                            fill="orange"
                        />
                    </Svg>
                    <Text style={{ position: 'absolute', color: 'white', left: 3 }}>Zone 1</Text>
                </View>
            </TouchableOpacity>
        </View>

        <Modal isOpen={scanQRCode} position={"bottom"} onClosed={() => setScanQRCode(false)} style={{ height: '90%' }}>
            <View style={styles.container}>
                {
                    Master.choosedZone !== '' && scanQRCode
                    ? <BarCodeScanner
                        onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
                        style={StyleSheet.absoluteFillObject}
                    />
                    : <Text>Please choose zone first</Text>
                }
                {scanned && <Button title={'Tap to Scan Again'} onPress={() => setScanned(false)} />}
            </View>
        </Modal>
    </View>
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        // backgroundColor: '#ffb029',
        backgroundColor: '#fff'
    },
    containerContent: {
        flexDirection: 'row',
        flexWrap: 'wrap'
    },
    contactItemStyle: {
        height: 40, width: '50%'
    },
    gridView: {
        marginTop: 10,
        flex: 1,
    },
    itemContainer: {
        justifyContent: 'center',
        borderRadius: 5,
        padding: 10,
        height: 50,
    },
    itemContainerList: {
        justifyContent: 'center',
        borderRadius: 5,
        padding: 10,
        height: 50,
    },
    itemName: {
        fontSize: 16,
        color: '#fff',
        fontWeight: '600',
        alignContent: 'center',
        textAlign: 'center'
    },
    itemCode: {
        fontWeight: '600',
        fontSize: 12,
        color: '#fff',
    },
})

export default ZoneChoose